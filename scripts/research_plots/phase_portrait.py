import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl
mpl.style.use('dark_theme.mplstyle')
from cycler import cycler

# Set color cycle in code
colors = ['#61AFEF', '#E5C07B', '#98C379', '#C678DD', '#E06C75']
plt.rcParams['axes.prop_cycle'] = cycler(color=colors)

fig, ax = plt.subplots(figsize=(5, 3))

ax.arrow(23.3297, 2.99888, 0, -2.47468, head_width=2,
          head_length=0.05, fc='gray', ec='gray', ls='dashed')

data_dir = "/home/arif/codes-main/accretion/adiabatic_kerr/phase_portrait/phase_p_a05/"

x, y = np.loadtxt(f'{data_dir}/bondisupersonic.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C0', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/bondisubsonic.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C0', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/bondisupersonic_inner.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C1', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/bondisubsonic_inner.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C1', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/windsupersonic.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C2', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/windsubsonic.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C2', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/windsupersonic_inner.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C1', label='Loaded from file!')

x, y = np.loadtxt(f'{data_dir}/windsubsonic_inner.dat', usecols=(0, 3), unpack=True)
ax.semilogx(x, y, 'C1', label='Loaded from file!')

ax.set_xlabel(r'$r$ [$GM_{\mathrm{BH}}/c^2$]')
ax.set_ylabel(r'$\mathcal{M}$')
ax.set_ylim(0, 5)
ax.text(4, 1, r'$r_{\rm in}$')
ax.text(12, 1, r'$r_{\rm mid}$')
ax.text(500, 1, r'$r_{\rm out}$')
ax.text(9.83467, 1, r'$+$')
# ax.text(4, 4.5, r'$\xi_0 = 1.002,\gamma = 1.35,\lambda_0 = 3.05, a =
# 0.5$', fontsize=20,bbox = {'facecolor': 'white', 'alpha': 0.5, 'pad': 5})
ax.set_title(r'$\xi_0 = 1.002,\gamma = 1.35,\lambda_0 = 3.05, a = 0.5$', c="gray")
# ax.legend()

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

fig.savefig('../../assets/research/AGravity/AGravity.svg', bbox_inches='tight')
plt.close(fig)
