FROM node:18.19.0 as builder 

ARG VITE_REACT_BASE_API_URL

ENV VITE_REACT_BASE_API_URL=$VITE_REACT_BASE_API_URL

ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_SECRET=$CLOUDINARY_SECRET


COPY ./Web /opt/web
WORKDIR /opt/web
RUN npm ci
RUN npm run build


FROM node:18.19.0-alpine3.17
COPY ./Api /opt/geo-my-wish 
WORKDIR /opt/geo-my-wish
COPY --from=builder /opt/web/dist /opt/geo-my-wish/web/build
RUN npm ci --only=production


EXPOSE 3000

CMD ["npm", "start"]
