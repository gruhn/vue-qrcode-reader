{
  description = "";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let 
        pkgs = nixpkgs.legacyPackages.${system}; 
      in 
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_18
            nodePackages.pnpm
            nodePackages.typescript-language-server
            vue-language-server
          ];
        };
      }
    );
}
