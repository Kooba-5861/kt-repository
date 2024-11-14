// amplify_outputs.json を読み込んで不要な情報を削除

const fs = require('fs');

const filename = 'amplify_outputs.json';

// JSONファイルを読み込む
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error('ファイルの読み込みエラー:', err);
        return;
    }

    try {
        // JSONをパース
        const json = JSON.parse(data);

        // 不要な項目を削除
        delete json.auth;
        // クライアントで使用できないテーブル情報の削除
        if (json.data && json.data.model_introspection && json.data.model_introspection.models) {
            // JDPUserSession
            delete json.data.model_introspection.models.JDPUserSession;
            // JDPProductInventory
            delete json.data.model_introspection.models.JDPProductInventory;
            // JDPProductOrder
            delete json.data.model_introspection.models.JDPProductOrder;
        }

        // 修正したJSONを文字列に変換
        const updatedData = JSON.stringify(json, null, 2);

        // 同じファイルに書き込む
        fs.writeFile(filename, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('ファイルの書き込みエラー:', err);
            } else {
                console.log('ファイルが正常に更新されました');
            }
        });
    } catch (parseError) {
        console.error('JSONのパースエラー:', parseError);
    }
});
