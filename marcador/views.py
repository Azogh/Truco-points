from django.shortcuts import render

def index(request):
    return render(request, 'marcador/index.html')

def regras(request):
    return render(request, 'marcador/regras.html')