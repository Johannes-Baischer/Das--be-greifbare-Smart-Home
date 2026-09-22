sudo apt update
sudo apt install docker.io docker-compose-v2 -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
