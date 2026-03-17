FROM harbor.arlth.cn/library/nginx:alpine
COPY dist /usr/share/nginx/html
#域名根目录校验文件
#COPY ./build/yZ7BcXYSAD.txt /usr/share/nginx/html
COPY ./build/default.conf /etc/nginx/conf.d/default.conf
