import face_recognition
import numpy as np
import os
import csv
import cv2
import pandas as pd
from datetime import datetime


class face_function():
    def registerimage(self, cv2image, stu_num, name):
        face_landmarks_list = face_recognition.face_landmarks(cv2image)
        if face_landmarks_list:
            face_locations = face_recognition.face_locations(cv2image)
            face_encodings = face_recognition.face_encodings(cv2image, face_locations)
            face_encodings = np.asarray(face_encodings)

            ## 특징값 저장
            df = pd.DataFrame(face_encodings)

            csvfiledir = "students/" + str(stu_num) + "_" + name + "/" + "captured_feature_data.csv"
            print(csvfiledir)
            # 파일이 이미 존재한다면
            if (os.path.isfile(csvfiledir)):
                countA = 0
                countB = 0

                #저장된 csv값과 얼굴 특징 비교, 출석 알고리즘
                with open(csvfiledir, 'r') as csvfile:
                    reader = csv.reader(csvfile, delimiter=',')

                    for row in reader:
                        print('countA', countA)
                        print('countB', countB)

                        countA = countA+1
                        face_feature = list(map(float, row))

                        face_distances = face_recognition.face_distance(face_feature, face_encodings)
                        print(face_distances)
                        if face_distances<0.2:
                            df.to_csv(csvfiledir, mode='a', index=False, header=None)
                            break
                        else:
                            countB = countB + 1
                csvfile.close()

                #csv의 모든 특징 매치 후 일치하지 않는다면 False
                if countA == countB:
                    print('check')
                    return False

            # 파일이 없다면
            else:
                df.to_csv(csvfiledir, index=False, header=None)

            return True

        else:
            return False

    def check_face_num(self, cv2_image):
        face_landmark_list = face_recognition.face_landmarks(cv2_image)
        if face_landmark_list:
            face_locations = face_recognition.face_locations(cv2_image)

            if len(face_locations) == 1:
                print(face_locations)
                return True
            else:
                return False