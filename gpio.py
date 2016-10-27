#!/usr/bin/python

import sys
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)

arg = sys.arv[1]

if arg == 'on':
    cmd = True

if arg == 'off':
    cmd = False

while true:
    # GPIO.output(23, True)
    print 'Working for it....' + cmd
