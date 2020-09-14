from ..Models import MapModel
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from ..apicodes import keyword
import simplejson as json
import os
import sys

# 상위폴더의 파일을 import 하기 위해 상위폴더의 Path를 등록해줌
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def MapView(request):  # 맵 템플릿 연결
    template_name = 'durumiApp/Map.html'
    # Map.html을 띄워줌
    context = {
        "Map": MapModel.Map(),
    }
    return render(request, template_name, context)


@csrf_exempt  # 보안문제로 적어줌
def Pos(request):  # 해당 장소에 대한 좌표정보 전송
    template_name = 'durumiApp/Map.html'
    try:
        # searchbox에서 내용 받아와 keyword 함수 실행 하여 검색결과 JSON으로 받아옴.
        Input_str = request.POST.get("searchBox", "")
    except (KeyError, Input_str == ""):
        context = {
            "Map": MapModel.Map
        }
        return render(request, template_name, context)
    else:
        result = keyword.keywordFindAPI(Input_str)
        context = {
            "result": result
        }
        return HttpResponse(json.dumps(context), content_type="application/json")



def HamburgerMenu(request):
    template_name = 'durumiApp/HamburgerMenu.html'
    context = {
        "Test": "test"
    }
    return render(request, template_name, context)


def PlaceView(request):
    template_name = 'durumiApp/PlaceView.html'
    context = {
        "Test": "test"
    }
    return render(request, template_name, context)


def PictureView(request):
    template_name = 'durumiApp/PictureView.html'
    context = {
        "Test": "test"
    }
    return render(request, template_name, context)
