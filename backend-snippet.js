/**
 * Miden Payroll Backend - Treasury Balance Endpoint Snippet
 * 
 * Instructions:
 * 1. Add this endpoint to your existing Node.js Express server running on 38.49.209.149:3001.
 * 2. Ensure the 'child_process' module is imported: `const { exec } = require('child_process');`
 * 3. Make sure the Miden CLI is in the PATH of the user running this server.
 */

app.get('/balance', (req, res) => {
    // 1. Sync the state first to ensure fresh data
    exec('miden-client sync', (syncError, syncStdout, syncStderr) => {
        if (syncError) {
            console.error('Error syncing miden client:', syncError);
            return res.status(500).json({ error: 'Failed to sync Miden client' });
        }

        // 2. Query the specific account
        exec('miden-client account show 0x9193b77c62aaf5000c00822fde5008', (err, stdout, stderr) => {
            if (err) {
                console.error('Error fetching account:', err);
                return res.status(500).json({ error: 'Failed to fetch treasury account' });
            }

            try {
                // 3. Parse the CLI standard output to extract the fungible asset amount
                // The exact regex depends on miden-client output format, but typically looks like:
                // "Fungible Assets: [..., amount: 450, ...]" or similar table row.
                // Assuming it outputs in a tabular or known format:

                // Example Regex (Tune this based on exact CLI output)
                const balanceMatch = stdout.match(/37d5977a8e16d8205a360820f0230f.*?\b(\d+)\b/i)
                    || stdout.match(/fungible.*?(\d+)/i);

                let balance = 0;
                if (balanceMatch && balanceMatch[1]) {
                    balance = parseInt(balanceMatch[1], 10);
                } else {
                    // Fallback parsing or set to 0 if no assets found
                    console.warn("Could not match exact balance from output:", stdout);
                }

                return res.json({ balance });
            } catch (parseError) {
                return res.status(500).json({ error: 'Failed to parse treasury balance output' });
            }
        });
    });
});
