const BASE_URL = '/api';

/**
 * POST /run-payroll
 * Sends a payroll request to the Miden backend.
 *
 * @param {{ employeeId: string, amount: string|number }} payload
 * @returns {Promise<Object>} The JSON response from the backend
 * @throws {Error} If the network request fails or the server returns a non-OK status
 */
export async function runPayroll({ employeeId, amount }) {
    const response = await fetch(`${BASE_URL}/run-payroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, amount: Number(amount) }),
    });

    if (!response.ok) {
        let message = `Server error: ${response.status}`;
        try {
            const errBody = await response.json();
            if (errBody?.message || errBody?.error) {
                message = errBody.message ?? errBody.error;
            }
        } catch {
            // ignore parse error; use status-based message
        }
        throw new Error(message);
    }

    return response.json();
}

/**
 * GET /balance
 * Fetches the current treasury token balance from the backend.
 *
 * @returns {Promise<{ balance: number }>}
 */
export async function fetchTreasuryBalance() {
    const response = await fetch(`${BASE_URL}/balance`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.status}`);
    }

    return response.json();
}
