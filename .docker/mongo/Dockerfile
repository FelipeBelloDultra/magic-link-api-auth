FROM mongo:5.0.25

ENV MONGO_INITDB_ROOT_USERNAME docker-username-docker
ENV MONGO_INITDB_ROOT_PASSWORD docker-password-docker
ENV MONGO_REPLICA_PORT 27017
ENV MONGO_REPLICA_HOST localhost

# we take over the default & start mongo in replica set mode in a background task
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
    # we prepare the replica set with a single node and prepare the root user config
    INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
    INIT_USER_CMD="db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] })"; \
    # we wait for the replica set to be ready and then submit the commands just above
    until (mongo admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD && $INIT_USER_CMD"); do sleep 1; done; \
    # we are done but we keep the container by waiting on signals from the mongo task
    echo "REPLICA SET ONLINE"; wait $MONGOD_PID;
