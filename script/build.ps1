./node_modules/.bin/prebuild -t 8.2.1 -t 8.9.0 -t 9.4.0 -t 10.11.0 -t 11.9.0 --strip -u $Env:GITHUB_AUTH_TOKEN
./node_modules/.bin/prebuild -t 8.2.1 -t 8.9.0 -t 9.4.0 -t 10.11.0 -t 11.9.0 -a ia32 --strip -u $Env:GITHUB_AUTH_TOKEN
./node_modules/.bin/prebuild -t 1.8.2 -t 2.0.0 -t 3.0.0 -t 4.0.4 -r electron --strip -u $Env:GITHUB_AUTH_TOKEN
./node_modules/.bin/prebuild -t 1.8.2 -t 2.0.0 -t 3.0.0 -t 4.0.4 -r electron -a ia32 --strip -u $Env:GITHUB_AUTH_TOKEN
