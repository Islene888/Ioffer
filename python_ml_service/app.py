from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 加载你的训练好的模型
model = joblib.load('recommendation_model.pkl')
school_data = pd.read_csv('school_database.csv')

@app.route('/recommend', methods=['POST'])
def recommend_schools():
    try:
        data = request.json
        user_profile = data['user_profile']
        num_recommendations = data.get('num_recommendations', 10)
        
        # 使用你的模型进行预测
        user_features = extract_user_features(user_profile)
        predictions = model.predict(user_features)
        
        # 获取推荐结果
        recommendations = get_top_recommendations(
            predictions, 
            school_data, 
            num_recommendations
        )
        
        return jsonify({
            'recommendations': recommendations,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

def extract_user_features(profile):
    """从用户档案提取模型特征"""
    features = {
        'gpa': profile['gpa'],
        'toefl': profile['toefl'],
        'gre': profile['gre'],
        'major_encoded': encode_major(profile['major']),
        'target_country': encode_country(profile['targetCountries']),
        # 添加更多特征...
    }
    return pd.DataFrame([features])

def get_top_recommendations(predictions, school_data, num_recs):
    """获取top推荐结果"""
    # 你的推荐逻辑
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
