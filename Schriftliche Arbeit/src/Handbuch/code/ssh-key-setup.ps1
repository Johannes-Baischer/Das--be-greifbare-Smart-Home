ssh-keygen -t ed25519

type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh mmse@mmse-smarthome "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

ssh mmse@mmse-smarthome
