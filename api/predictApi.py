from flask_restful import Api, Resource, reqparse
import json
from api.predictions import predict_sentence

class predictionApiHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Song Lyrics Classifier"
      }

  def post(self):

    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('body', type=str)

    args = parser.parse_args()

    print(args['body'])

    request_json = args['body']
    ret_msg = request_json

    if ret_msg:
      message = predict_sentence(ret_msg)
    else:
      message = {"error":"No Msg"}
    
    final_ret = message

    return final_ret