from django.conf import settings
from django.http import JsonResponse, HttpResponse, Http404, FileResponse

import os

# Create your views here.

def getVideoURL(request):
    return JsonResponse({"funny": {"1": "huhcat.mp4", "2": "mamashende.mp4", "3": "shakingCat.mp4", "4": "woce.mp4"},
                         "music": {"5": "callOfSilence.mp4", "6": "collaspingWorld.mp4", "7": "nanchen.mp4", "8": "poemOfBird.mp4"}})


def getVideos(request):
    videoName = request.path[7:]
    videoPath = os.path.join(settings.VIDEO_BACKUP, videoName)
    video_file = open(videoPath, 'rb')
    response = FileResponse(video_file)
    return response




