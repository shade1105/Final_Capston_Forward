from flask import Flask, render_template, jsonify, request, json, redirect, Response
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import base64
from flask_bcrypt import Bcrypt
from PIL import Image
from io import BytesIO
import os
from datetime import datetime
import ast
import numpy as np
import cv2

from sitable import Signdatabase
from face import face_function

app = Flask(__name__)
app.config['SECRET_KEY'] = 'BCODE_Flask'
app.config['JWT_SECRET_KEY'] = 'super-secrete'
socketio = SocketIO(app)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

CORS(app)


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')


@app.route('/static/', methods=['GET', 'POST'])
def home1():
    return render_template('index.html')


# 회원 가입 로직
@app.route('/static/users/register', methods=['POST'])
def register():

    User = {
        'stu_num': request.get_json()['stu_num'],
        'name': request.get_json()['name'],
        'email': request.get_json()['email'],
        'password': bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    }
    db = Signdatabase()
    msg = db.register(User)
    if msg == True:
        result = {
            "success": True,
            "msg": "등록에 성공하였습니다"
        }
        return result
    else:
        result = {
            "success": False,
            "msg": msg
        }
        return result


# 로그인 로직
@app.route("/static/users/authenticate", methods=['POST'])
def signIn():
    stu_num = request.get_json()['stu_num']
    password = request.get_json()['password']

    db = Signdatabase()
    msg = db.login(stu_num, password)
    if msg == True:
        token = create_access_token(identity={'stu_num': stu_num})
        user = db.getUserbyStu_num(stu_num)
        result = {
            "success": True,
            "msg": "로그인되었습니다",
            "token": token,
            "user": user
        }

        return result

    else:
        result = {
            "success": False,
            "msg": msg

        }
        print(result)
        return result



@app.route("/static/image/decodeImage", methods=['POST'])
def decode():
    user = ast.literal_eval(request.get_json()['user'])
    stu_num = user.get('stu_num')
    name = user.get('name')


    f = open('file.txt', 'w')
    image = request.get_json()['image'].replace('data:image/png;base64,', '')
    f.write(image)
    f.close()
    f = open('file.txt', 'r')
    data = f.read()
    f.closed

    #PIL image
    im = Image.open(BytesIO(base64.b64decode(data)))

    #PIL to cv2
    cv2_image = np.array(im.convert('RGB'))
    cv2_image = cv2_image[:,:,::-1].copy()

    #import face_function module
    ff = face_function()
    #check face number of picutre
    if ff.check_face_num(cv2_image) == True:


        #save face as csv
        check = ff.registerimage(cv2_image, stu_num, name)

        time_today = str(datetime.now().year) + "." + str(datetime.now().month) + "." + str(datetime.now().day)
        imagedir = 'students/' + str(stu_num) + '_' + name + '/' + time_today + '.jpg'

        #얼굴 인식 확인 및 이미지 저장
        if check == True:
            if (os.path.isdir('students/' + str(stu_num) + '_' + name)):
                im.save(imagedir, 'png')
            else:
                os.mkdir('students/' + str(stu_num) + '_' + name)
                im.save(imagedir, 'png')

            result = {
                "success": True,
                "msg": "얼굴 데이터셋 생성 성공"
            }
            return result

        elif check == False:
            result = {
                "success": False,
                "msg": "얼굴 인식이 실패하였습니다"
            }
            return result

    else:
        result = {
            "success": False,
            "msg": "얼굴이 인식되지 않았거나 두개 이상입니다"
        }
        return  result









# 로그아웃 로직
@app.route('/logout')
def logout():
    custom_resp = Response("COOKIE 제거")
    custom_resp.set_cookie('USERID', expires=0)
    return custom_resp


# 쿠키 값 확인 로직
@app.route("/loginstatus")
def cookie_status():
    tempstr = request.cookies.get('stu_num', '빈문자열')
    tempstr = tempstr.encode("UTF-8")

    return (base64.b64decode(tempstr)).decode('UTF-8')


if __name__ == '__main__':
    socketio.run(app, port=9999, debug=True)