if ! nc -z localhost 27017 2>/dev/null; then
    echo "MongoDB is not running on localhost:27017"
    exit 1
fi

cd backend
[ ! -d "node_modules" ] && npm install
npm run start:dev &
cd ../frontend
[ ! -d "node_modules" ] && npm install
npm start
