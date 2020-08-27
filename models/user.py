from database import Database



class User():
    def __init__(self):
        self.UserSchema= {
        'stu_num',
        'name',
        'email',
        'password'
        }
    db = Database()

    def getUserBystu_num(self, stu_num):
        sql = "SELECT stu_num"
        sql += "FROM users "
        sql += "WHERE stu_num='{}';".format(stu_num)
        return