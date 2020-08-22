
from database import Database


class Signdatabase(Database):
    def register(self, User):
        print(User)
        sql = "INSERT INTO users(stu_num, name, email, password)"
        sql += " VALUES('{}','{}','{}','{}');".format(User.get('stu_num'), User.get('name'),
                                                      User.get('email'), User.get('password'))

        result = None
        try:
            self.cursor.execute(sql)
            self.db.commit()
            result = True
        except Exception as e:
            result = {"error": "{}".format(e)}

        return result

    def login(self, stu_num, password):
        sql = "SELECT student_num, password "
        sql += "FROM users "
        sql += "WHERE student_num='{}';".format(stu_num)
        result = False

        try:
            onerow = self.executeOne(sql)
            if password == onerow.get('password'):
                result = True

        except Exception as e:
            return {"error": "{}".format(e)}
        return result
