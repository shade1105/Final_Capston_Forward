import face_recognition
import numpy as np
import os
import csv
import cv2
import pandas as pd
from datetime import datetime

class face_to_csv():
    def makecsv(self, imagedir, stu_num, name):
        iamge = face_recognition.load_image_file(imagedir)
        face_landmarks_list = face_recognition.face_landmarks(iamge)
        if face_landmarks_list:
            face_locations = face_recognition.face_locations(iamge)
            face_encodings = face_recognition.face_encodings(iamge, face_locations)
            face_encodings = np.asarray(face_encodings).T

            ## 특징값 저장
            df = pd.DataFrame(face_encodings)

            csvfiledir = "students/" + str(stu_num) + "_" + name + "/" + "captured_feature_data.csv"
            # 파일이 이미 존재한다면
            if (os.path.isfile(csvfiledir)):
                df_csv = pd.read_csv(csvfiledir, header=None)
                df_csv[-1] = df
                df_csv.to_csv(csvfiledir, index=False, header=None)
            # 파일이 없다면
            else:
                df.to_csv(csvfiledir, index=False, header=None)

        else:
            return False