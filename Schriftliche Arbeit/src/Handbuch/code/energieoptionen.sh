sudo nano /etc/systemd/logind.conf
# HandleLidSwitch=ignore
# HandleLidSwitchExternalPower=ignore
# HandleLidSwitchDocked=ignore

sudo systemctl restart systemd-logind
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target