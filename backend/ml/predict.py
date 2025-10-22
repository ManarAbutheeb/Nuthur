import sys, json, torch, numpy as np
import warnings
warnings.filterwarnings("ignore")
from pytorch_tabnet.tab_model import TabNetClassifier

MODEL_PATH = "tabnet_fire_model.zip"
clf = TabNetClassifier()
clf.load_model(MODEL_PATH)

# نتحقق إذا فيه ملف JSON انرسل كـ argument
if len(sys.argv) > 1:
    with open(sys.argv[1], "r") as f:
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
# print(json.dumps({"prediction": 1}))  # إجبار النتيجة على وجود خطر لتجربة التنبيه
