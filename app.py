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
    atten(User.get('stu_num'))
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

# 관리자 회원가입 로직
@app.route('/static/admins/register', methods=['POST'])
def adminregister():
    Admin = {
        'admin_num': request.get_json()['admin_num'],
        'password': bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    }
    db = Signdatabase()
    msg = db.registeradmin(Admin)
    if msg == True:
        result = {
            "success": True,
            "msg": "관리자 등록에 성공하였습니다"
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
        return result

# 어드민 로그인 로직
@app.route("/static/admin/authenticateAdmin", methods=['POST'])
def signInAdmin():
    admin_num = request.get_json()['admin_num']
    password = request.get_json()['password']

    db = Signdatabase()
    msg = db.loginadmin(admin_num, password)
    if msg == True:
        token_data = {
            "admin_num": admin_num,
            "admin": True
        }
        token = create_access_token(identity=token_data)

        admin = db.getAdminbyAdmin_num(admin_num)
        result = {
            "success": True,
            "msg": "관리자 계정으로 로그인되었습니다",
            "token": token,
            "admin": admin
        }

        return result

    else:
        result = {
            "success": False,
            "msg": msg
        }
        return result


@app.route("/static/admin/check", methods=['GET'])
@jwt_required
def checkadmin():
    token_data = get_jwt_identity()
    return jsonify(token_data)


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

    # PIL image
    im = Image.open(BytesIO(base64.b64decode(data)))

    # PIL to cv2
    cv2_image = np.array(im.convert('RGB'))
    cv2_image = cv2_image[:, :, ::-1].copy()

    # import face_function module
    ff = face_function()
    if ff.check_face_num(cv2_image) == True:
        if (os.path.isdir('students/' + str(stu_num) + '_' + name)):
            pass
        else:
            os.mkdir('students/' + str(stu_num) + '_' + name)

        check = ff.registerimage(cv2_image, stu_num, name)
        time_today = str(datetime.now().year) + "." + \
            str(datetime.now().month) + "." + str(datetime.now().day)
        imagedir = 'students/' + str(stu_num) + \
            '_' + name + '/' + time_today + '.jpg'
        if check == True:
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
        return result


@app.route("/static/image/encode/send", methods=["POST", "GET"])
def imgSend():
    """
    프론트 상에서 POST 요청이 들어오면 이미지 파일을 encode해서 전송해줌 
    attention-stu 상에서 보기 버튼 클릭시 실행 
    return : base64 encode data 
    """
    if request.method == "POST":
        name = request.get_json()[0]['name']
        stu_num = request.get_json()[0]['stu_num']
        date = request.get_json()[0]['date']
        try:
            result = {
                "msg": imgencode(name, stu_num, date).decode('utf-8')
            }
            return result
        except:
            result = {
                "msg": None
            }
            return result


def imgencode(name, stu_num, date):
    """
    파라미터로 받은 위치에 사진을 base64이미지 String 형식으로 반환해줌 
    :param name: 학생이름
    :param stu_num: 학번
    :param date: 날짜 
    :return : ./stu_num/Name/date.jpg 라는 파일을 encode 해줌 
    """
    with open("./students/{}_{}/{}.jpg".format(stu_num, name, date), "rb") as img_file:
        my_string = base64.b64encode(img_file.read())

    return my_string


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


def atten(stunum):
    """
    과목생성 페이지가 없어서 인위적으로 데이터베이스에 과목을 생성하기위해
    구현한 로직 
    :param : 학번
    :return : 데이터베이스에 attend테이블에 데이터 생성  
    """
    db = Signdatabase()
    a, b, c, f = map(int, '2020,08,25,11'.split(','))
    import datetime
    for i in range(16):
        d = datetime.datetime(a, b, c, f)+datetime.timedelta(weeks=i)
        attend = {
            'stu_num': stunum,
            'week': i+1,
            'atten_date': d.strftime('%Y-%m-%d %H'),
            'atten': "None"
        }
        db.attendInsert(attend)


# 과목 조회
@app.route("/static/subject/info", methods=["POST"])
def subject_info():

    db = Signdatabase()
    temp = db.get_subjectInfo(request.get_json()['stu_num'])
    result = {
        'msg': temp
    }
    return result


""" 
def subject_index():
    a, b, c = map(int, input().split(','))
    for i in range(16):
        d = datetime.datetime(a, b, c)+datetime.timedelta(weeks=i)
        print(d.strftime('%Y-%m-%d'))
"""


@app.route("/static/atten/attend", methods=["POST"])
def attendance_check():
    """
    프론트에서 출석데이터를 요청했을경우 처리해주는 로직
    :param : 
    :return : 얼굴인식 값과 학번을 통하여 atten_update() 로직을 실행
    """
    data = request.get_json()[0]
    print(data)
    stu_num = data['stu_num']
    week = data['week']
    db = Signdatabase()
    # TODO decode() 에서 결과 값만 atten_update True 자리에
    # 결과를 반환하는것만 넣어주면 해결
    db.update_atten(stu_num, week, atten_update(True, stu_num, week))
    return "UPDATE ON "


def atten_update(face_data, stu_num, week):
    """
    얼굴 인식이 완료 되면 데이터베이스에 출결 값과 출석 시간을 저장함
    :param :얼굴인식 상태(True,False) , 학번 , 출결 주차
    :return : 출결 값 (출석,지각,결석)
    """
    import datetime
    if face_data == True:
        db = Signdatabase()
        bc = db.get_subject_date(stu_num, week)
        bc = bc['atten_date']
        db.stu_atten_date_update(
            stu_num=stu_num, week=week, nowtime=datetime.datetime.now())
        cutline = db.get_stu_atten_date(stu_num=stu_num, week=week)[
            'stu_atten_date']-bc
        if cutline < datetime.timedelta(hours=2):
            return "출석"
        elif cutline > datetime.timedelta(hours=2):
            return "지각"
    elif face_data == False:
        return "결석"


if __name__ == "__main__":
    socketio.run(app, port=9999, debug=True)
