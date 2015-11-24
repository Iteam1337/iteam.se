if ($request_uri ~ medarbetare) {
  rewrite /medarbetare/(.*) /coworkers/$1 permanent;
  break;
}

if ($request_uri ~ karriar) {
  rewrite /karriar/(.*) /career/$1 permanent;
  break;
}

if ($request_uri ~ fjarrhjalp) {
  rewrite /fjarrhjalp/(.*) /remoteassistance/$1 redirect;
  break;
}

if ($request_uri ~ operations) {
  rewrite /operations/(.*) /remoteassistance/$1 redirect;
  break;
}

if ($request_uri ~ "om-oss") {
  rewrite /om\-oss/(.*) /aboutus/$1 permanent;
  break;
}

if ($request_uri ~ "vara-tjanster") {
  rewrite /vara\-tjanster/(.*) /$1 redirect;
  break;
}

error_page 404 /404/index.html;
