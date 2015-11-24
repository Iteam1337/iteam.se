if ($request_uri ~ medarbetare) {
  rewrite /medarbetare/(.*) /coworkers/$1 permanent;
  break;
}
