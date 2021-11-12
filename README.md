# Projekt_1_docker

CZĘŚĆ OBOWIĄZKOWA

3.
a. Do zbudowania opracowanego obrazu używamy polecenia: docker build . -t projekt_app
b. Do uruchomienia kontenera na podstaiwe obrazu używamy: docker run -p 5000:8080 -d --name projekt_container projekt_app
c. W celu uzyskania informacji które wygenerował serwer należy użyć: docker logs projekt_container
d. Do sprawdzenia liczby warstw zbudowanego obrazu należy użyć: docker history projekt_app

4.
Do zbudowania obrazu z bezpośredniego linku GitHub używamy: docker build https://github.com/mpgis/Projekt_1_docker.git
W celu przeniesienia obrazu na swoje konto DockerHub należy użyć: docker tag (NazwaObrazu):(NazwaTagu) (NazwaRepozytorium):(NazwaTagu) 
                                                                i docker push (NazwaRepozytorium):(NazwaTagu) 
                                                                
CZĘŚĆ DODATKOWA

1. 
a. W celu uruchomienia konterera z registry należy użyć polecenia: docker run -d -p 6677:6677 --restart=always --name registry registry:2
b. Do pobrania najnowszej wersji ubuntu używamy: docker pull ubuntu
   Do zmiany nazwy obrazu należy użyć: docker tag ubuntu localhost:6677/local-ubuntu
   W celu wgrania obrazu do utworzonego rejestru należy wykorzystać polecenie: docker push localhost:6677/local-ubuntu
   
2.

W celu utworzenia folderu z certyfikatami należy użyć: mkdir -p certs
Do utworzonego folderu należy wkleić pliki domain.crt oraz domain.key
Należy stworzyć katalog auth: mkdir auth
W celu utworzenia pliki z hasłem należy wykorzystać polecenie: docker run --entrypoint htpasswd httpd:2 -Bbn testuser testpassword > auth/htpasswd
Do zatrzymania registry należy użyć polecenia: docker container stop registry
Do uruchomienia registry z podstawowym uwierzytelnianiem należy użyć: docker run -d -p 6677:6677 --restart=always --name registry -v "$(pwd)"/auth:/auth -e "REGISTRY_AUTH=htpasswd" -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd -v "$(pwd)"/certs:/certs -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key registry:2
