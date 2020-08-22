from database import Database
from flask_bcrypt import Bcrypt
from flask import Flask

app=Flask(__name__)
bcrypt=Bcrypt(app)

class Signdatabase(Database):
    def register(self, User):
        sql = "INSERT INTO users(stu_num, name, email, password)"
        sql += " VALUES('{}','{}','{}','{}');".format(User.get('stu_num'), User.get('name'),
                                                      User.get('email'), User.get('password'))

        try:
            self.cursor.execute(sql)
            self.db.commit()
            result = True
        except Exception as e:
            result = {"error": "{}".format(e)}

        return result


    def login(self, stu_num, password):
        sql = "SELECT stu_num, password "
        sql += "FROM users "
        sql += "WHERE stu_num='{}';".format(stu_num)

        try:
            saved_pass = self.executeOne(sql)
            if bcrypt.check_password_hash(saved_pass.get('password'), password):
                return True

        except Exception as e:
            return {"error": "{}".format(e)}


    def getUserbyStu_num(self, stu_num):
        sql = "SELECT stu_num, name, email "
        sql += "FROM users "
        sql += "WHERE stu_num='{}';".format(stu_num)

        try:
            user = self.executeOne(sql)
        except Exception as e:
            return {"error": "{}".format(e)}
        return user