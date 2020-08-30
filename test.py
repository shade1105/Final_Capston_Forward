import face
import numpy as np
import os
import csv
import ast

csvfiledir = "students/" + str(91514672) + "_" + '김수운' + "/" + "captured_feature_data.csv"



feature = np.array([])
with open(csvfiledir, 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')

    for row in reader:
        face_feature = list(map(float, row))








