{ pkgs ? import <nixpkgs> {} }: 

pkgs.mkShell {

  buildInputs = with pkgs; [
    nodejs_20
    nodePackages.pnpm
    nodePackages.typescript-language-server
    nodePackages.vls
  ];
  
}
