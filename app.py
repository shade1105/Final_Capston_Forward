from flask import Flask, render_template, jsonify, request, json, redirect, Response
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager, create_access_token
import hashlib
import base64
from sitable import Signdatabase
from flask_bcrypt import Bcrypt
from models.user import User
from PIL import Image
from io import BytesIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'BCODE_Flask'
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
    result = ""
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
        print(result)
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
    f = open('file.txt', 'w')
    f.write(request.get_json().replace('data:image/png;base64,', ''))
    f.close()
    f = open('file.txt', 'r')
    data = f.read()
    f.closed

    im = Image.open(BytesIO(base64.b64decode(data)))
    im.save('soso.png', 'PNG')

    return "null"

# 로그아웃 로직
@app.route('/logout')
def logout():
    custom_resp = Response("COOKIE 제거")
    custom_resp.set_cookie('USERID', expires=0)
    return custom_resp


# 쿠키 값 확인 로직
@app.route("/loginstatus")
def cookie_status():
    tempstr = request.cookies.get('USERID', '빈문자열')
    tempstr = tempstr.encode("UTF-8")

    return (base64.b64decode(tempstr)).decode('UTF-8')


if __name__ == '__main__':
    socketio.run(app, port=9999, debug=True)
