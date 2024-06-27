// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as maxmind from 'maxmind';
import * as path from 'path';

let reader: maxmind.Reader<any>;
let isDecorationEnabled = true;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    const ipRegex = /\b(?:(?!10(?:\.\d{1,3}){3}|127(?:\.\d{1,3}){3}|169\.254(?:\.\d{1,3}){2}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(?:\d{1,3}\.){3}\d{1,3}|(?:(?!fe80:|fc00:|fd00:|::1$|::)(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?:(?::[a-fA-F0-9]{1,4}){1,6})))\b/g;

    const dbPath = path.join(context.extensionPath,'data', 'country_asn.mmdb');
    try {
        reader = await maxmind.open(dbPath);
    } catch (err) {
        console.error('Error opening MMDB file:', err);
        return;
    }

    let activeEditor = vscode.window.activeTextEditor;

    const ipDecorationType = vscode.window.createTextEditorDecorationType({
        after: {
            margin: '0 0 0 1em',
        }
    });

	function updateDecorations() {
        if (!activeEditor) {return;}
        const showIcon = vscode.workspace.getConfiguration('DecorIP').get('showIcon');
        const icon = vscode.workspace.getConfiguration('DecorIP').get('icon');
        
        const text = activeEditor.document.getText();
        const matches = [];
        let match;
        while ((match = ipRegex.exec(text))) {
            const startPos = activeEditor.document.positionAt(match.index);
            const endPos = activeEditor.document.positionAt(match.index + match[0].length);
            
            const ip = match[0];
            const location = reader.get(ip);
            const country = location?.country || 'Unknown';
            const asn = location?.as_name || 'Unknown';
            const asnNum = location?.asn || 'Unknown';
            const continentName=location?.continent_name || 'Unknown';
            const countryName=location?.country_name || 'Unknown';
            const hoverMessage = new vscode.MarkdownString();
            hoverMessage.appendMarkdown(`**IP Address:** ${ip}\n\n`);
            hoverMessage.appendMarkdown(`**Continent:** ${continentName}\n\n`);
            hoverMessage.appendMarkdown(`**Country:** ${countryName} (${country})\n\n`);
            hoverMessage.appendMarkdown(`**ASN:** ${asn} (${asnNum})\n\n`);
            hoverMessage.appendMarkdown(`[more](https://ipinfo.io/${ip})\n`);

            const decoration = { 
                range: new vscode.Range(startPos, endPos), 
                hoverMessage: hoverMessage,
                renderOptions:{}
            };
            if (showIcon) {
                decoration.renderOptions= {
                    after: {
                        contentText: `${icon}${country}; ${asn}`
                    }
                };  
            }else{
                decoration.renderOptions= {
                    after: {
                        contentText: `${country}; ${asn}`
                    }
                };
            }
            matches.push(decoration);
        }
       
        activeEditor.setDecorations(ipDecorationType, matches);
        
    }

    

	if (activeEditor) {
        updateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            updateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            updateDecorations();
        }
    }, null, context.subscriptions);

}

// This method is called when your extension is deactivated
export function deactivate() {}
