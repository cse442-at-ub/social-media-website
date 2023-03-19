# project_s23-chat-union
project_s23-chat-union created by GitHub Classroom

Teammate:Haoxiang Lin, Ke Xu, Yutian Luo, Zhexi Chen, Yanbin Li

App features description document: 
https://docs.google.com/document/d/1icv4mZFDPd_PJ9Of5cyC5fHza8qtqn7zvuK21qqJa7M/edit




To connect cheshire server: 
ssh YOUR_UBIT@cheshire.cse.buffalo.edu

Go to our dir:
cd /web/CSE442-542/2023-Spring/cse-442k/


How to put source code to the server? 
Need to 
1) upload local file on ub_sftp
2) go to cheshire server download a file to server

To upload a file from local computer: 
pc> % sftp YOUR_UBIT@myfiles-sftp.buffalo.edu
sftp> put "absPath filename"

To download a file to server:
> ~ % ssh YOUR_UBIT@cheshire.cse.buffalo.edu
cheshire {~} > cd /web/CSE442-542/2023-Spring/cse-442k/
cheshire {/web/CSE442-542/2023-Spring/cse-442k} > sftp YOUR_UBIT@myfiles-sftp.buffalo.edu
sftp> get "filename"


Accessing UBfs with sftp to myfiles-sftp:
https://www.buffalo.edu/ubit/service-guides/file-storage-and-sharing/accessing-myfiles-from-anywhere/accessing-with-sftp-to-myfiles-sftp.html

How to Transfer Files using SFTP?
https://www.geeksforgeeks.org/how-to-transfer-files-using-sftp/
