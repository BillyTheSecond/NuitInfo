from django.shortcuts import render
from django.core.serializers import serialize
from .models import Question

import json

# Create your views here.

def quiz_view(request):
    # Query all instances of Question
    question_queryset = Question.objects.all()

    # Convert queryset to JSON
    question_json = serialize('json', question_queryset)

    question_data = json.loads(question_json)

    json_list = []
    question_dict = {} 

    for item in question_data :
        question_dict = {}
        for value in item['fields'] :
            if item['fields'][value] != None :

                question_dict[value] = item['fields'][value]

        json_list.append(question_dict)

    print(json_list)

    json_list = json.dumps(json_list)

    return render(request, 'quiz.html', {'data': json_list})
