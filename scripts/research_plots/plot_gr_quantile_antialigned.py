from gw_eccentricity.plot_settings import use_fancy_plotsettings, figWidthsOneColDict, colorsDict, labelsDict, dark2, figWidthsTwoColDict
import matplotlib.pyplot as plt
from matplotlib.path import Path
import numpy as np
import pandas as pd
import matplotlib.lines as mlines
from cycler import cycler


plt.style.use("dark_theme.mplstyle")

# Set color cycle in code
colors = ['#61AFEF', '#E5C07B', '#98C379', '#C678DD', '#E06C75']
plt.rcParams['axes.prop_cycle'] = cycler(color=colors)

fig, ax = plt.subplots(figsize=(5, 3))

# ellipse


def radius(theta, ecc, a):
    """Get the r coordinate of an ellipse."""
    return a * (1 - ecc**2)/(1 + ecc * np.cos(theta))


a = 20
ecc = 0.9
theta = np.arange(0, 2 * np.pi, 0.1)
rs = radius(theta, ecc, a)
x = rs * np.cos(theta) + a
y = rs * np.sin(theta)
verts = [(x[idx], y[idx]) for idx in range(len(x))]
verts = np.array(verts)
codes = [Path.MOVETO]
for idx in range(len(x)-2):
    codes.append(Path.LINETO)
codes.append(Path.CLOSEPOLY)
ellipse = Path(verts, codes)
# ellipse = ellipse.transformed(mpl.transforms.Affine2D().rotate_deg(45))

tag = "_reweighted"
# tag = ""
scale = 100 if tag == "_reweighted" else 1

# primary antialigned
# quasicircular
data_dir = "/home/arif/imrct_meets_eccentricity/plotting_scripts/data"
data = pd.read_csv(
    f"{data_dir}/quantile_quasicircular_a1_0.4_a2_0.3_tilt1_-1_tilt2_1{tag}.csv", sep=",",
    index_col=False)
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=".",
        markerfacecolor="none",
        c=colors[0],
        markersize=12, label=r"$\chi_1=-0.4, \chi_2=0.3$, QR")

# eccentric
data = pd.read_csv(f"{data_dir}/quantile_eccentric_a1_0.4_a2_0.3_tilt1_-1_tilt2_1{tag}.csv",
                   sep=",", index_col=False)
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=ellipse,
        markerfacecolor="none",
        c=colors[0],
        markersize=10, label=r"$\chi_1=0.4, \chi_2=0.3$, ER")

# secondary antialigned
# quasicircular
data = pd.read_csv(
    f"{data_dir}/quantile_quasicircular_a1_0.4_a2_0.3_tilt1_1_tilt2_-1{tag}.csv", sep=",",
    index_col=False)
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=".",
        markerfacecolor="none",
        c=colors[1],
        markersize=12, label=r"$\chi_1=0.4, \chi_2=-0.3$, QR")

# eccentric
data = pd.read_csv(f"{data_dir}/quantile_eccentric_a1_0.4_a2_0.3_tilt1_1_tilt2_-1{tag}.csv",
                   sep=",", index_col=False)
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=ellipse,
        markerfacecolor="none",
        c=colors[1],
        markersize=10, label=r"$\chi_1=0.2, \chi_2=0.1$, ER")


# both antialigned
# quasicircular
data = pd.read_csv(
    f"{data_dir}/quantile_quasicircular_a1_0.4_a2_0.3_tilt1_-1_tilt2_-1{tag}.csv", sep=",",
    index_col=False)
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=".",
        markerfacecolor="none",
        c=colors[2],
        markersize=12, label=r"$\chi_1=-0.4, \chi_2=-0.3$, QR")
# eccentric
data = pd.read_csv(
    f"{data_dir}/quantile_eccentric_a1_0.4_a2_0.3_tilt1_-1_tilt2_-1{tag}.csv", sep=",",
    index_col=False)
print(data, f"{data_dir}/quantile_eccentric_a1_0.4_a2_0.3_tilt1_-1_tilt2_-1{tag}.csv")
ax.plot(data["imrct"], data["GR Quantile (%)"] * scale, marker=ellipse,
        markerfacecolor="none",
        c=colors[2],
        markersize=10, label=r"$\chi_1=-0.4, \chi_2=-0.3$, QR")


ax.set_xlabel(rf"{labelsDict['eob_eccentricity']} at "
              f"{labelsDict['f22_ref']} = 20 Hz")
ax.set_ylabel(r"GR Quantile ($\%$)")

# confidence line
lstyles = ["--", ":"]
conflines = []
for idx, confidence in enumerate([68, 90]):
    conflines.append(ax.axhline(confidence, ls=lstyles[idx], c='gray', label=rf"${confidence}\%$"))

# custom legend
qc = mlines.Line2D([], [], color='gray', marker=".", markersize=12,
                   label='quasicircular',
                   ls="",
                   markerfacecolor="none")
ec = mlines.Line2D([], [], color='gray', marker=ellipse, markersize=10,
                   label='eccentric',
                   ls="",
                   markerfacecolor="none")
recovery_legend = ax.legend(handles=[qc, ec, conflines[0], conflines[1]],
                            loc="upper left",
                            bbox_to_anchor=(0.0, 1.05),
                            bbox_transform=ax.transAxes,
                            fontsize=10,
                            columnspacing=0.5,
                            ncols=4)
ax.add_artist(recovery_legend)
primary_anti = mlines.Line2D([], [], color=colors[0],
                             # label=r"$\chi_1=-0.4, \chi_2=0.3$"
                             label=r"$(\pi, 0)$")
secondary_anti = mlines.Line2D([], [], color=colors[1],
                               # label=r"$\chi_1=0.4, \chi_2=-0.3$"
                               label=r"$(0, \pi)$")
both_anti = mlines.Line2D([], [], color=colors[2],
                          # label=r"$\chi_1=-0.4, \chi_2=-0.3$"
                          label=r"$(\pi, \pi)$"
                          )
ax.legend(handles=[primary_anti, secondary_anti, both_anti],
          loc="upper left",
          bbox_to_anchor=(0.0, 0.95),
          bbox_transform=ax.transAxes,
          fontsize=10,
          ncols=3,
          columnspacing=0.5,
          handlelength=1)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

fig.savefig("../../assets/research/tgr/imrct_eccentric-dark.svg", bbox_inches='tight')
plt.close(fig)
