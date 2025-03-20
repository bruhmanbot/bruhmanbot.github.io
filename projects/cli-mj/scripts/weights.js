import { fillInNavFooter } from "./report.js";
import { polyval, generateFitXValues, randomWithPop } from "./polyval.js";

const weightsx = [];

for (let t=0; t<=100;t++) {
    const unrounded = -6 + t * 0.1
    // round it to 2 dp bcs floating pt is stupid
    weightsx[weightsx.length] = Math.round(100*unrounded)/100;
};

const wins = {
    "ai_0": [2868, 2942, 2945, 2936, 2897, 2855, 2958, 2826, 2935, 2915, 2866, 2871, 2919, 2919, 2816, 2911, 2774, 2965, 2831, 2861, 2890, 2868, 2843, 2873, 2918, 2884, 2882, 2856, 2868, 2742, 2925, 2909, 2744, 2928, 2862, 2912, 2864, 2789, 2850, 2805, 2859, 2864, 2888, 2930, 2952, 2865, 2950, 2893, 2883, 2853, 2823, 2850, 2923, 2837, 2816, 2824, 2826, 2915, 2798, 2849, 2937, 2881, 2907, 2885, 2897, 2999, 3065, 3027, 3003, 3021, 2993, 2973, 2970, 3065, 3047, 3034, 3073, 3082, 3115, 3017, 3029, 3113, 3146, 3066, 3114, 3097, 3112, 3209, 3072, 3119, 3111, 3161, 3058, 3186, 3110, 3151, 3245, 3092, 3161, 3284, 3233],
    "ai_1": [3480, 3407, 3313, 3532, 3422, 3527, 3489, 3644, 3495, 3547, 3579, 3565, 3580, 3615, 3630, 3618, 3609, 3559, 3761, 3646, 3708, 3649, 3672, 3763, 3705, 3828, 3763, 3730, 3826, 3787, 3780, 3788, 3854, 3833, 3841, 3903, 3822, 3840, 3811, 3757, 3752, 3893, 3828, 3846, 3779, 3823, 3813, 3843, 3879, 3851, 3926, 3751, 3749, 3883, 3854, 3837, 3823, 3843, 3916, 3839, 3759, 3721, 3612, 3574, 3642, 3569, 3487, 3528, 3566, 3454, 3507, 3468, 3522, 3481, 3384, 3473, 3297, 3381, 3420, 3311, 3250, 3335, 3241, 3351, 3326, 3254, 3299, 3244, 3255, 3310, 3230, 3216, 3087, 3142, 3061, 3018, 2928, 2906, 2939, 2930, 2861],
    "ai_2": [2931, 2949, 2981, 3008, 2929, 2959, 2998, 2884, 2963, 2942, 2946, 3010, 2892, 2939, 2971, 2842, 2953, 2869, 2938, 2968, 2892, 2859, 2927, 2865, 2887, 2921, 2885, 2867, 2936, 3031, 2912, 2886, 2915, 2897, 2972, 2862, 2920, 2914, 2937, 2972, 2948, 2869, 2895, 2933, 2824, 2953, 2954, 2914, 2913, 2926, 2874, 2890, 2943, 2950, 2915, 2887, 2928, 2886, 2861, 2907, 2976, 3145, 3143, 3165, 3073, 3176, 3086, 3165, 3155, 3135, 3150, 3198, 3170, 3167, 3173, 3177, 3221, 3264, 3171, 3310, 3323, 3334, 3251, 3170, 3195, 3279, 3306, 3253, 3194, 3251, 3339, 3304, 3493, 3307, 3435, 3389, 3487, 3425, 3427, 3384, 3489],
    "ai_3": [2965, 2915, 2933, 2913, 3027, 2995, 2841, 2847, 2930, 2981, 2884, 2860, 3004, 2861, 2933, 2889, 2926, 2983, 2929, 2903, 2935, 2920, 2941, 2914, 2897, 2798, 2864, 2957, 2854, 2835, 2858, 2873, 2894, 2769, 2892, 2871, 2887, 2889, 2877, 2899, 2912, 2917, 2882, 2882, 2887, 2887, 2804, 2853, 2888, 2983, 2904, 2908, 2859, 2860, 2919, 2880, 2907, 2927, 2883, 2947, 3001, 2929, 2944, 3080, 2972, 2905, 3005, 3041, 2995, 3015, 2923, 3055, 2914, 3020, 3058, 2985, 3022, 2981, 2998, 3012, 3002, 3021, 3143, 3077, 3071, 3043, 3038, 3013, 3125, 3049, 3074, 3088, 3132, 3121, 3050, 3169, 3117, 3266, 3312, 3149, 3221],
    "ai_0_bf": [0.0078e3, 0.0466e3, 2.9260e3],
    "ai_1_bf": [-0.0268e3, -0.1078e3, 3.7086e3],
    "ai_2_bf": [ 10.9, 73.2, 3024.4 ],
    "ai_3_bf": [ 7, 37.9, 2933.4 ],
};

const losses = {
    "ai_0": [3158, 3176, 3151, 3169, 3232, 3296, 3093, 3253, 3198, 3246, 3206, 3116, 3145, 3111, 3129, 3183, 3186, 3160, 3285, 3236, 3192, 3125, 3197, 3275, 3268, 3205, 3235, 3167, 3091, 3074, 3177, 3180, 3228, 3183, 3171, 3173, 3187, 3193, 3154, 3191, 3196, 3225, 3286, 3103, 3097, 3143, 3082, 3066, 3230, 3093, 3198, 3120, 3200, 3133, 3111, 3165, 3261, 3255, 3119, 3183, 3153, 3089, 3106, 3178, 3110, 3098, 3014, 2967, 3040, 3075, 2979, 3104, 3097, 3052, 3088, 3000, 3041, 2954, 2916, 3021, 2877, 3078, 3121, 3102, 3019, 2958, 3039, 2969, 3004, 2974, 3038, 2957, 2965, 2984, 2939, 2864, 2952, 2959, 2957, 2905, 2883],
    "ai_1": [2615, 2568, 2611, 2651, 2651, 2656, 2752, 2612, 2690, 2704, 2674, 2632, 2664, 2718, 2652, 2663, 2684, 2803, 2706, 2708, 2728, 2799, 2797, 2693, 2762, 2749, 2743, 2807, 2802, 2762, 2803, 2859, 2746, 2779, 2910, 2863, 2809, 2820, 2882, 2882, 2897, 2866, 2898, 2886, 2931, 2864, 2964, 2920, 2928, 3005, 2945, 2900, 2935, 2976, 2881, 2873, 3016, 2901, 2804, 2956, 3137, 3361, 3462, 3451, 3390, 3517, 3433, 3597, 3564, 3516, 3469, 3483, 3426, 3595, 3649, 3586, 3621, 3629, 3640, 3673, 3785, 3661, 3679, 3587, 3715, 3725, 3712, 3727, 3722, 3649, 3753, 3986, 3923, 3854, 3945, 3979, 4005, 4128, 4053, 4153, 4206],
    "ai_2": [3238, 3258, 3263, 3329, 3214, 3223, 3161, 3191, 3251, 3282, 3195, 3273, 3333, 3323, 3283, 3359, 3212, 3205, 3189, 3251, 3329, 3249, 3157, 3243, 3149, 3251, 3269, 3283, 3370, 3234, 3270, 3226, 3150, 3187, 3233, 3302, 3277, 3196, 3254, 3124, 3131, 3236, 3153, 3274, 3248, 3227, 3239, 3290, 3202, 3340, 3154, 3203, 3095, 3283, 3291, 3223, 3152, 3250, 3283, 3173, 3287, 3080, 3045, 3018, 2999, 2997, 3130, 3105, 3069, 2940, 2990, 3006, 3020, 3061, 2932, 3081, 2983, 3019, 3014, 2952, 2915, 2933, 2925, 2933, 2978, 2969, 2944, 2970, 2935, 3008, 2928, 2863, 2899, 2924, 2815, 2814, 2850, 2831, 2797, 2780, 2856],
    "ai_3": [3233, 3211, 3147, 3240, 3178, 3161, 3280, 3145, 3184, 3153, 3200, 3285, 3253, 3182, 3286, 3055, 3180, 3208, 3279, 3183, 3176, 3123, 3232, 3204, 3228, 3226, 3147, 3153, 3221, 3325, 3225, 3191, 3283, 3278, 3253, 3210, 3220, 3223, 3185, 3236, 3247, 3216, 3156, 3328, 3166, 3294, 3236, 3227, 3203, 3175, 3230, 3176, 3244, 3138, 3221, 3167, 3055, 3165, 3252, 3230, 3096, 3146, 2993, 3057, 3085, 3037, 3066, 3092, 3046, 3094, 3135, 3101, 3033, 3025, 2993, 3002, 2968, 3106, 3134, 3004, 3027, 3131, 3056, 3042, 2994, 3021, 3060, 3053, 2985, 3098, 3035, 2963, 2983, 2994, 2957, 3070, 2970, 2771, 3032, 2909, 2859],
    "ai_0_bf": [-4.2, -35.8, 3116.1],
    "ai_1_bf": [-0.7, 12.9, 191.5, 3207.2],
    "ai_2_bf": [-6.9, -58.7, 3133.7],
    "ai_3_bf": [-5.1, -37.9, 3146.1],
};

const tsumos = {
    "ai_0": [927, 933, 960, 832, 927, 920, 966, 932, 927, 926, 862, 910, 878, 873, 905, 892, 900, 865, 847, 926, 853, 894, 892, 844, 844, 901, 869, 865, 822, 868, 823, 912, 870, 858, 820, 810, 826, 884, 873, 806, 875, 831, 797, 821, 852, 804, 843, 811, 822, 805, 810, 880, 836, 855, 830, 877, 816, 879, 838, 786, 790, 828, 815, 794, 841, 789, 780, 790, 771, 850, 836, 839, 833, 793, 816, 799, 826, 780, 821, 847, 835, 800, 796, 824, 825, 812, 746, 808, 876, 806, 851, 811, 805, 782, 851, 812, 781, 817, 839, 862, 791],
    "ai_1": [1030, 1022, 1059, 1011, 1066, 1001, 1032, 1121, 1051, 1040, 1076, 1060, 1063, 1087, 1117, 1108, 1096, 1129, 1091, 1039, 1110, 1098, 1118, 1108, 1140, 1094, 1083, 1149, 1158, 1132, 1124, 1138, 1102, 1149, 1132, 1121, 1080, 1177, 1110, 1185, 1155, 1198, 1115, 1099, 1168, 1145, 1174, 1120, 1178, 1180, 1124, 1191, 1152, 1169, 1147, 1182, 1286, 1099, 1157, 1180, 1093, 1094, 1120, 1068, 1060, 1058, 1068, 999, 1051, 1024, 1046, 961, 1056, 1022, 986, 1014, 1038, 1028, 966, 1038, 1019, 929, 970, 989, 953, 955, 933, 1007, 942, 989, 942, 908, 937, 914, 955, 888, 894, 863, 869, 842, 832],
    "ai_2": [963, 956, 924, 923, 925, 917, 882, 947, 938, 912, 943, 915, 909, 941, 914, 928, 918, 881, 905, 900, 921, 920, 890, 881, 894, 922, 946, 904, 870, 916, 913, 845, 880, 909, 872, 914, 941, 894, 839, 905, 897, 836, 875, 892, 879, 864, 882, 853, 824, 779, 886, 913, 885, 861, 863, 875, 861, 820, 909, 861, 860, 850, 813, 869, 850, 861, 905, 830, 857, 834, 870, 854, 875, 856, 912, 894, 880, 833, 891, 866, 874, 874, 865, 858, 905, 853, 891, 852, 925, 861, 850, 876, 856, 879, 925, 854, 880, 918, 835, 871, 879],
    "ai_3": [909, 968, 962, 881, 892, 951, 904, 916, 924, 874, 966, 929, 883, 912, 847, 935, 953, 868, 885, 904, 877, 915, 866, 890, 878, 844, 872, 843, 892, 873, 864, 850, 917, 868, 843, 863, 843, 853, 931, 895, 857, 859, 929, 844, 870, 874, 878, 940, 841, 843, 886, 859, 850, 829, 856, 837, 818, 857, 844, 843, 837, 782, 826, 777, 884, 828, 841, 801, 822, 852, 847, 834, 845, 822, 808, 841, 847, 847, 787, 777, 837, 815, 800, 816, 791, 885, 849, 808, 779, 780, 810, 766, 817, 829, 793, 842, 854, 864, 768, 811, 816],
    "ai_0_bf": [1.9617, -6.91, 818.7905],
    "ai_1_bf": [-8.3, -34.5, 1107.6],
    "ai_2_bf": [1.7793, -2.6423, 865.3353],
    "ai_3_bf": [0.7099, -10.5377, 840.0346],
};

const curveColors = ["#1282a2", "#8b5fbf","#2a7f62", "#9e2a2b"];

const winsGraphData = [{
    x: weightsx,
    y: wins["ai_0"],
    mode: "markers",
    type: "scatter",
    name: "ai_0",
    marker: {color: curveColors[0]}
},
{
    x: weightsx,
    y: wins["ai_1"],
    mode: "markers",
    type: "scatter",
    name: "ai_1",
    marker: {color: curveColors[1]}
},
{
    x: weightsx,
    y: wins["ai_2"],
    mode: "markers",
    type: "scatter",
    name: "ai_2",
    marker: {color: curveColors[2]}
},
{
    x: weightsx,
    y: wins["ai_3"],
    mode: "markers",
    type: "scatter",
    name: "ai_3",
    marker: {color: curveColors[3]}
}]

function Layout(yaxis, title, scale=[2500,4000]) {
    return {
        xaxis: {range: [-6.2, 4.2], title: "Losing weight"},
        yaxis: {range: scale, title: yaxis},
        title: title,
        font: {
            family: "Ubuntu, monospace",
            size: 16,
        }
    };
}

const winsLayout = Layout("Wins", "Wins against losing weight");

Plotly.newPlot('wins-graph', winsGraphData, winsLayout);

// losing graphs
const lossGraphData = [{
    x: weightsx,
    y: losses["ai_0"],
    mode: "markers",
    type: "scatter",
    name: "ai_0",
    marker: {color: curveColors[0]}
},
{
    x: weightsx,
    y: losses["ai_1"],
    mode: "markers",
    type: "scatter",
    name: "ai_1",
    marker: {color: curveColors[1]}
},
{
    x: weightsx,
    y: losses["ai_2"],
    mode: "markers",
    type: "scatter",
    name: "ai_2",
    marker: {color: curveColors[2]}
},
{
    x: weightsx,
    y: losses["ai_3"],
    mode: "markers",
    type: "scatter",
    name: "ai_3",
    marker: {color: curveColors[3]}
}]

const lossLayout = Layout("Losses", 'Losses against losing weight', [2500, 4250]);

Plotly.newPlot('loss-graph', lossGraphData, lossLayout);

// sumo ratio graph
const tsumoGraphData = [{
    x: weightsx,
    y: tsumos["ai_0"],
    mode: "markers",
    type: "scatter",
    name: "ai_0",
    marker: {color: curveColors[0]}
},
{
    x: weightsx,
    y: tsumos["ai_1"],
    mode: "markers",
    type: "scatter",
    name: "ai_1",
    marker: {color: curveColors[1]}
},
{
    x: weightsx,
    y: tsumos["ai_2"],
    mode: "markers",
    type: "scatter",
    name: "ai_2",
    marker: {color: curveColors[2]}
},
{
    x: weightsx,
    y: tsumos["ai_3"],
    mode: "markers",
    type: "scatter",
    name: "ai_3",
    marker: {color: curveColors[3]}
}];

const tsumoLayout = Layout('Tsumos', "Tsumos against losing weight", [700, 1300]);

Plotly.newPlot('tsumo-graph', tsumoGraphData, tsumoLayout);

// Ratio plot
const ratios = {
    "ai_0": [0.932, 0.938, 0.956, 0.908, 0.929, 0.911, 0.991, 0.901, 0.935, 0.938, 0.881, 0.93, 0.925, 0.915, 0.921, 0.908, 0.89, 0.921, 0.871, 0.928, 0.893, 0.916, 0.909, 0.878, 0.882, 0.921, 0.895, 0.899, 0.887, 0.892, 0.887, 0.939, 0.874, 0.901, 0.884, 0.88, 0.883, 0.889, 0.906, 0.846, 0.898, 0.876, 0.851, 0.908, 0.916, 0.876, 0.911, 0.891, 0.881, 0.894, 0.862, 0.903, 0.892, 0.902, 0.888, 0.9, 0.847, 0.921, 0.881, 0.858, 0.893, 0.923, 0.913, 0.894, 0.918, 0.918, 0.927, 0.964, 0.921, 0.963, 0.958, 0.954, 0.931, 0.946, 0.948, 0.945, 0.956, 0.958, 1.003, 0.975, 0.987, 0.968, 0.961, 0.961, 0.986, 0.979, 0.937, 0.999, 1.009, 0.988, 1.004, 1.016, 0.982, 0.987, 1.009, 1.026, 1.001, 0.989, 1.046, 1.081, 1.036],
    "ai_1": [1.214, 1.193, 1.189, 1.242, 1.227, 1.199, 1.196, 1.296, 1.213, 1.231, 1.25, 1.252, 1.269, 1.263, 1.313, 1.281, 1.264, 1.282, 1.316, 1.244, 1.308, 1.256, 1.29, 1.335, 1.325, 1.313, 1.291, 1.324, 1.355, 1.326, 1.324, 1.318, 1.323, 1.345, 1.329, 1.333, 1.303, 1.352, 1.292, 1.332, 1.306, 1.389, 1.304, 1.312, 1.317, 1.343, 1.318, 1.304, 1.369, 1.361, 1.32, 1.319, 1.309, 1.339, 1.343, 1.352, 1.394, 1.308, 1.369, 1.355, 1.251, 1.203, 1.178, 1.151, 1.144, 1.125, 1.123, 1.084, 1.117, 1.078, 1.103, 1.057, 1.119, 1.079, 1.025, 1.065, 1.038, 1.062, 1.029, 1.043, 0.996, 0.995, 1.002, 1.038, 0.992, 0.975, 0.984, 1.011, 0.965, 1.03, 0.967, 0.923, 0.921, 0.927, 0.91, 0.876, 0.86, 0.817, 0.854, 0.815, 0.801],
    "ai_2": [0.953, 0.941, 0.921, 0.954, 0.935, 0.937, 0.931, 0.929, 0.939, 0.927, 0.947, 0.932, 0.913, 0.93, 0.929, 0.894, 0.926, 0.909, 0.94, 0.926, 0.917, 0.913, 0.928, 0.905, 0.926, 0.934, 0.939, 0.909, 0.888, 0.946, 0.929, 0.885, 0.92, 0.928, 0.927, 0.919, 0.953, 0.916, 0.884, 0.946, 0.937, 0.878, 0.921, 0.929, 0.89, 0.917, 0.913, 0.888, 0.891, 0.853, 0.926, 0.918, 0.944, 0.902, 0.899, 0.901, 0.908, 0.879, 0.913, 0.918, 0.925, 0.985, 0.961, 1.02, 0.972, 1.015, 0.997, 0.993, 1.002, 0.995, 1.007, 1.021, 1.007, 1.006, 1.066, 1.022, 1.029, 1.016, 1.046, 1.052, 1.06, 1.087, 1.065, 1.033, 1.065, 1.039, 1.093, 1.039, 1.079, 1.045, 1.065, 1.109, 1.11, 1.091, 1.147, 1.111, 1.139, 1.15, 1.125, 1.133, 1.157],
    "ai_3": [0.925, 0.951, 0.956, 0.925, 0.936, 0.975, 0.901, 0.91, 0.935, 0.929, 0.951, 0.915, 0.926, 0.92, 0.88, 0.952, 0.949, 0.918, 0.912, 0.928, 0.918, 0.939, 0.903, 0.925, 0.906, 0.868, 0.907, 0.904, 0.911, 0.874, 0.896, 0.891, 0.92, 0.867, 0.892, 0.902, 0.893, 0.882, 0.944, 0.911, 0.888, 0.903, 0.954, 0.882, 0.906, 0.902, 0.886, 0.944, 0.898, 0.928, 0.919, 0.89, 0.884, 0.888, 0.905, 0.884, 0.891, 0.922, 0.88, 0.904, 0.944, 0.891, 0.944, 0.935, 0.964, 0.938, 0.95, 0.953, 0.954, 0.96, 0.928, 0.966, 0.94, 0.963, 0.961, 0.965, 0.974, 0.961, 0.922, 0.928, 0.958, 0.953, 0.975, 0.967, 0.959, 1.01, 0.992, 0.951, 0.954, 0.937, 0.969, 0.969, 1.0, 1.007, 0.954, 1.013, 1.028, 1.091, 1.007, 1.018, 1.057],
    "ai_0_bf": [0.0040, 0.0181, 0.9088],
    "ai_1_bf": [-0.0122, -0.0660, 1.2361],
    "ai_2_bf": [0.0051, 0.0307, 0.9547],
    "ai_3_bf": [0.0032, 0.0145, 0.9192],
};

const ratiosData = [{
    x: weightsx,
    y: ratios["ai_0"],
    mode: "markers",
    type: "scatter",
    name: "ai_0",
    marker: {color: curveColors[0]}
},
{
    x: weightsx,
    y: ratios["ai_1"],
    mode: "markers",
    type: "scatter",
    name: "ai_1",
    marker: {color: curveColors[1]}
},
{
    x: weightsx,
    y: ratios["ai_2"],
    mode: "markers",
    type: "scatter",
    name: "ai_2",
    marker: {color: curveColors[2]}
},
{
    x: weightsx,
    y: ratios["ai_3"],
    mode: "markers",
    type: "scatter",
    name: "ai_3",
    marker: {color: curveColors[3]}
},
{
    x: [-10, 5],
    y: [1,1],
    type: "scatter",
    name: "ref",
    marker: {color: 'rgba(0,0,0, 0.4)'}
}];

const ratioLayout = Layout('Ratio', "W/L Ratio against Losing Weight", [0.8, 1.4]);

Plotly.newPlot('ratio-graph', ratiosData, ratioLayout)

// Customised plot
const paramsTable = document.getElementById('customised-plot');
const addRowButton = document.getElementById('add-row');
addRowButton.addEventListener('click', addRow, false);

const remRowButton = document.getElementById('remove-row');
remRowButton.addEventListener('click', removeRow, false)

// Generate plot button
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', generatePlotMain, false);

function makeDropdown(options_arr) {
    // Returns a dropdown menu inside a SELECT element
    // with the options from options_arr
 
    const selectionMenu = document.createElement('select');

    // Create the option for our lists
    for (let v of options_arr) {
        const option = document.createElement('option');
        option.setAttribute('value', v);
        option.innerHTML = v;
        selectionMenu.appendChild(option);
    }

    return selectionMenu;
}

function addRow() {
    // Support 16 rows for data + 1 row for the header
    if (paramsTable.childElementCount == (16 + 1)) {
        alert('Max 16 rows supported');
        return
    }
    const newRow = document.createElement('tr');
    // Name field
    const nameCell = document.createElement('td');
    const nameEntry = document.createElement('input');
    nameEntry.setAttribute('type', 'text');
    nameCell.appendChild(nameEntry);
    newRow.appendChild(nameCell);

    // Series field
    const seriesSelect = makeDropdown(['wins', 'losses', 'tsumos', 'ratios']);
    const seriesCell = document.createElement('td');
    seriesCell.appendChild(seriesSelect);
    newRow.appendChild(seriesCell);

    // player field
    const playerCell = document.createElement('td');
    const playerSelect = makeDropdown(['ai_0', 'ai_1', 'ai_2', 'ai_3']);
    playerCell.appendChild(playerSelect);
    newRow.appendChild(playerCell);

    // Checkbox for best fit
    const bestFitCell = document.createElement('td');
    const bestFitBox = document.createElement('input');
    bestFitBox.setAttribute('type', 'checkbox');
    bestFitCell.appendChild(bestFitBox);
    newRow.appendChild(bestFitCell)
    
    // Add the new row to our table
    paramsTable.appendChild(newRow)
    return
}

function removeRow() {
    // Don't remove the remaining data entry row (1 row) + header row (1 row)
    if (paramsTable.childElementCount == 1 + 1) {
        alert("Please don't delete the last row!")
        return
    }

    paramsTable.deleteRow(-1);
    return
}

// Generate plot

function generatePlotMain() {
    const allLinesData = dataRowsFromParams();

    const plotlyLib = selectorsToPlotlyData(allLinesData);

    const customisedPlotData = plotlyLib[0];
    const range = plotlyLib[1];

    const customisedPlotLayout = Layout(null, null, range);

    const targetDiv = document.getElementById('customised-plot-graph');
    targetDiv.setAttribute('class', 'visible centre')

    Plotly.newPlot('customised-plot-graph', customisedPlotData, customisedPlotLayout);
    return
}

function dataRowsFromParams() {
    let allData = [];
    for (let i=1; i<paramsTable.childElementCount; i++){

        const row = paramsTable.children[i];
        
        let rowData = [];
        // add the value of the input boxes to our data array
        // td is in td level
        for (const td of row.children) {
            const c = td.firstChild
            // For the best fit box, we use a different attribute
            if (c.type == 'checkbox') {
                rowData.push(c.checked);
                continue
            }
            // normally we just append the value
            rowData[rowData.length] = c.value;
        }
        allData.push(rowData);
    }
    return allData
}

// TODO: MAKE A FUNCTION HERE TO CHANGE DATA SELECTORS IN THE ARRAY TO A PLOTLY PLOT

function selectorsToPlotlyData(lineInfoArray) {
    let colours = ["#2f4f4f", "#7f0000", "#006400", "#bdb76b", "#4b0082", "#ff0000", "#00ced1",
        "#ffa500", "#ffff00", "#00ff00", "#00fa9a", "#0000ff", "#ff00ff", "#6495ed", "#ff1493", "#ffb6c1"];

    function best_fit_on(infoArr) {
        return Boolean(infoArr[3])
    }

    let plotlyData = [];
    let weights_fit = generateFitXValues();
    let min = 10000; 
    let max = 0;

    for (const line of lineInfoArray) {
        // pick colour
        let chosenColour;
        let temp = randomWithPop(colours);
        console.log(temp)
        chosenColour = temp[0];
        colours = temp[1];

        const playerName = line[2];
        let lineName;
    
        if (line[0].length == 0) {
            lineName = playerName + '-' + line[1];
        }
        else {
            lineName = line[0];
        }

        
        let y_series, bestFitPolynomial;
        // if needed to continue to generate best fit line curve
        const polynomialFitKey = playerName + "_bf"        

        // Since access is relatively light, we can get the best fit here as well even if we do not need it.
        switch (line[1]) {
            case 'wins':
                y_series = wins[playerName];
                bestFitPolynomial = wins[polynomialFitKey];
                break
            case 'losses':
                y_series = losses[playerName];
                bestFitPolynomial = losses[polynomialFitKey];
                break
            case 'tsumos':
                y_series = tsumos[playerName];
                bestFitPolynomial = tsumos[polynomialFitKey];
                break
            default:
                y_series = ratios[playerName];
                bestFitPolynomial = ratios[polynomialFitKey];
                break
        }

        const lineData = {
            x: weightsx,
            y: y_series,
            mode: "markers",
            type: "scatter",
            name: lineName,
            marker: {
                color: chosenColour+'66',
            }
            };

        plotlyData.push(lineData);
        
        const minY = Math.min(...y_series);
        const maxY = Math.max(...y_series);
        
        // Adjust the range if needed
        if (minY < min) {
            min = minY;
        }

        if (maxY > max) {
            max = maxY;
        }

        // Continue on to generate best fit y series and plotting data

        if (!best_fit_on(line)) {
            continue
        }
        
        const bf_y_series = weights_fit.map(x => polyval(bestFitPolynomial, x))
        const bfData = {
            x: weights_fit,
            y: bf_y_series,
            type: "scatter",
            name: lineName + ' fit',
            marker: {
                color: chosenColour,
            }
            };

        plotlyData.push(bfData)
    }

    const range = new Array(min-200, max+200)
    return new Array(plotlyData, range)
}

// Add the first row upon loading the page
addRow()

// bottom navs
fillInNavFooter('Weights')


