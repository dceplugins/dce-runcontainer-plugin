FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html
COPY plugin.json /usr/share/nginx/html/

LABEL maintainer="Revol.Cai" \
      io.daocloud.dce.plugin.name="RunContainer" \
      io.daocloud.dce.plugin.description="部署一个容器" \
      io.daocloud.dce.plugin.categories="container-tool" \
      io.daocloud.dce.plugin.vendor="DaoCloud" \
      io.daocloud.dce.plugin.required-dce-version=">=2.6.0" \
      io.daocloud.dce.plugin.nano-cpus-limit="500000000" \
      io.daocloud.dce.plugin.memory-bytes-limit="419430400"
