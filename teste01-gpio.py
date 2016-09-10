import CHIP_IO.GPIO as GPIO
GPIO.setup("XIO-P0", GPIO.IN)
#GPIO.add_event_detect("XIO-P0", GPIO.BOTH)
#if GPIO.event_detected("XIO-P0"):
#  print "event detected!"

#if GPIO.input("XIO-P0"):
#  print("HIGH")
#else:
#  print("LOW")

print "Aguardando deteccao"
try:
  GPIO.wait_for_edge("XIO-P0", GPIO.FALLING)
  print("Caixa vazia")
except KeyboardInterrupt:
  GPIO.cleanup()

GPIO.cleanup()
