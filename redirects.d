error_page 404 /404/index.html;

location ^~ /services/ { return 404; }
location ^~ /karriar/supporttekniker/ { return 404; }
location ^~ /om-oss/kompetens/att-bestalla-agilt/ { return 404; }
location ^~ /case/amabv/ { return 404; }
location ^~ /case/wakers/ { return 404; }
location ^~ /case/landahl/ { return 404; }
location ^~ /case/beckers/ { return 404; }
location ^~ /case/carlstedt/ { return 404; }
location ^~ /case/stockmusic/ { return 404; }
location ^~ /case/svenskbyggtjanst/ { return 404; }
location ^~ /case/omvarldsbevakning/ { return 404; }
location ^~ /case/projektbevakning/ { return 404; }

# permanent redirects
if ($request_uri ~ "om-oss") {
  rewrite /om\-oss/(.*) /about/$1 permanent; break;
}
if ($request_uri ~ medarbetare) {
  rewrite /medarbetare/(.*) /team/$1 permanent; break;
}
if ($request_uri ~ karriar) {
  rewrite /karriar/(.*) /career/$1 permanent; break;
}
if ($request_uri ~ remoteassistance) {
  rewrite /remoteassistance/(.*) /operations/$1 permanent; break;
}
if ($request_uri ~ fjarrhjalp) {
  rewrite /fjarrhjalp/(.*) /operations/$1 permanent; break;
}
if ($request_uri ~ aboutus) {
  rewrite /aboutus/(.*) /about/$1 permanent; break;
}
if ($request_uri ~ coworkers) {
  rewrite /coworkers/(.*) /team/$1 permanent; break;
}

# temporary redirects
if ($request_uri ~ "vara-tjanster") {
  rewrite /vara\-tjanster/(.*) /$1 redirect; break;
}

