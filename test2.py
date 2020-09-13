import datetime
a, b, c = map(int, input().split(','))


for i in range(16):
    d = datetime.datetime(a, b, c)+datetime.timedelta(weeks=i)
    print(d.strftime('%Y-%m-%d'), "None", i+1)
