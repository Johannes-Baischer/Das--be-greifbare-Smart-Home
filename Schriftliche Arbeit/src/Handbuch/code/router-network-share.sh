nmcli connection show
sudo nmcli connection modify 'Wired connection 1' ipv4.addresses 10.0.0.1/24 ipv4.method shared
sudo nmcli connection down 'Wired connection 1' && sudo nmcli connection up 'Wired connection 1'
ip a
