#!/bin/bash

cmd.exe /c python3 manage.py makemigrations && cmd.exe /c python3 manage.py migrate
