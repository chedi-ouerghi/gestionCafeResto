[Setup]
AppName=Café Resto App
AppVersion=1.0
DefaultDirName={pf}\Café Resto App
DefaultGroupName=Café Resto App
OutputDir=.\dist
OutputBaseFilename=cafeRestoInstaller
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\backend-executable.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "build\*"; DestDir: "{app}\build"; Flags: ignoreversion recursesubdirs
Source: ".env"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Café Resto App"; Filename: "{app}\backend-executable.exe"

[Run]
Filename: "{app}\backend-executable.exe"; Description: "Lancer Café Resto App"; Flags: nowait postinstall skipifsilent
Filename: "cmd.exe"; Parameters: "/c npm install --production"; WorkingDir: "{app}"; Flags: waituntilterminated
