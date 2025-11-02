import sys, json, numpy as np
import warnings
import pickle
warnings.filterwarnings("ignore")


MODEL_PATH = "XGBoost_model.pkl"
with open(MODEL_PATH, "rb") as f:
    clf = pickle.load(f)


if len(sys.argv) > 1:
    with open(sys.argv[1], "r", encoding="utf-8") as f:
        data = json.load(f)
else:
    data = json.loads(sys.stdin.read().strip())


X = np.array([[data[k] for k in [
    "day","month","year",
    "Temperature","RH","Ws","Rain",
    "FFMC","DMC","DC","ISI","BUI","FWI"
]]], dtype=np.float32)

pred = clf.predict(X)[0]
print(json.dumps({"prediction": int(pred)}))
# # print(json.dumps({"prediction": 1}))  # إجبار النتيجة على وجود خطر لتجربة التنبيه
