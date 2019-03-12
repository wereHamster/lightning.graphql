let
  pkgs = import <nixpkgs> {};
  nodejs = pkgs.nodejs-10_x;

in pkgs.mkShell {
  buildInputs = [
    nodejs
    (pkgs.yarn.override { inherit nodejs; })
  ];
}
