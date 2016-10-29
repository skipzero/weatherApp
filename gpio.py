#!/usr/bin/python

import sys
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)

arg = sys.argv[1]

if arg == 'on':
  cmd = True
  GPIO.output(23, True)
  print(cmd)

if arg == 'off':
  cmd = False
  GPIO.output(23, False)
  print(cmd)
