sudo apt update && sudo apt upgrade -y
sudo apt install xrdp -y
echo xfce4-session > ~/.xsession
sudo adduser xrdp ssl-cert
sudo systemctl restart xrdp
sudo systemctl enable xrdp
sudo ufw allow 3389/tcp
hostname -I