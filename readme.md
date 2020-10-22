# 2020 졸업작품 AI 기반 출석인식

## 개발기간
* 2020-08 ~ 2020-10

## 개요
~~~
    코로나19 사태로 인터넷 강의 수요증가로 인한 강의 출석체크의 도움을 주는 플랫폼  
~~~


## 주요기능
* 회원가입시 얼굴을 등록하여 그 얼굴과 현재 출석중인 사람과 얼굴이 같다고 판단되면 출석체크를 해줍니다


## 사용기술 
* Python /Flask
* face_recognition
* Angualr6 
* Typescript
* MYSQL 
* Docker 
* GCP 
* Windows 10 
* Ubuntu 

## 화면 
[![텍스트](https://github.com/slackid/Final_Capston_Forward/blob/master/1.PNG)]()


## 실행순서

#### /Fian-Capston_Foward
###### 1) docker build -t backend:1.0 . 
###### 2)docker run -p 9999:9999 backend:1.0

#### /angular-Flask
1)docker build -t fron:1.0 . 
2)docker run -d -host=0.0.0.0 -p 443:443 fron:1.0 
