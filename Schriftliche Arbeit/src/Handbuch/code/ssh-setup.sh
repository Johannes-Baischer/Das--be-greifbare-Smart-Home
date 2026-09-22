sudo apt update
sudo apt install openssh-server -y
sudo systemctl enable --now ssh
sudo ufw allow ssh
sudo systemctl status ssh
hostname -I
