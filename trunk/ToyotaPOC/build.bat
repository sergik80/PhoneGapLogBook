cd www
call gulp js
cd..
cd platforms\android
call ant clean
cd..
cd..
call cordova build android
