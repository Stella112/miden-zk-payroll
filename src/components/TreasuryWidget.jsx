import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { fetchTreasuryBalance } from '../services/api';

export default function TreasuryWidget() {
    const [balance, setBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadBalance = async () => {
            try {
                const data = await fetchTreasuryBalance();
                if (isMounted) {
                    // Divide by 1,000,000 for 6 decimal places display
                    const formattedDisplay = (data.balance / 1000000).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                    });
                    setBalance(formattedDisplay);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Unable to load treasury balance');
                    console.error('Treasury Widget Error:', err);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadBalance();

        // Polling every 15 seconds to keep it "real-time"
        const interval = setInterval(loadBalance, 15000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <GlassCard
            className="anim-fade-up"
            style={{
                width: '100%',
                maxWidth: '480px',
                padding: '1.25rem 1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 140, 0, 0.4)',
                boxShadow: '0 4px 30px rgba(255, 140, 0, 0.1)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255, 140, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        fontSize: '1.2rem',
                        border: '1px solid rgba(255, 140, 0, 0.3)',
                    }}
                    aria-hidden="true"
                >
                    💎
                </div>
                <div>
                    <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Treasury Balance
                    </h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.1rem' }}>
                        {isLoading ? (
                            <span className="spinner" style={{ width: '1rem', height: '1rem', borderTopColor: 'var(--color-primary)' }} />
                        ) : error ? (
                            <span style={{ fontSize: '0.9rem', color: '#ff4d6d' }}>Error</span>
                        ) : (
                            `${balance} MIDEN`
                        )}
                    </p>
                </div>
            </div>

            {!isLoading && !error && (
                <div style={{
                    fontSize: '0.7rem',
                    color: '#10b981',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                    Live
                </div>
            )}
        </GlassCard>
    );
}
