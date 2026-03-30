(function () {
  const content = window.caseStudyContent;
  const state = {
    dimension: "all",
    scene: "all",
    kpi: "amount"
  };

  const metricMap = {
    amount: {
      label: "交易规模",
      unit: "M",
      accent: "var(--accent-cyan)"
    },
    count: {
      label: "交易笔数",
      unit: "k",
      accent: "var(--accent-amber)"
    },
    fee: {
      label: "手续费",
      unit: "M",
      accent: "var(--accent-lime)"
    },
    growth: {
      label: "环比变化",
      unit: "%",
      accent: "var(--accent-coral)"
    },
    active: {
      label: "活跃主体",
      unit: "",
      accent: "var(--accent-violet)"
    }
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    hydrateMeta();
    renderStaticSections();
    renderFilters();
    bindFilterEvents();
    renderAll();
  }

  function cacheElements() {
    elements.brandTitle = document.getElementById("brand-title");
    elements.brandSubtitle = document.getElementById("brand-subtitle");
    elements.heroEyebrow = document.getElementById("hero-eyebrow");
    elements.heroTitle = document.getElementById("hero-title");
    elements.heroSummary = document.getElementById("hero-summary");
    elements.heroTags = document.getElementById("hero-tags");
    elements.selectionNote = document.getElementById("selection-note");
    elements.filterDimension = document.getElementById("filter-dimension");
    elements.filterScene = document.getElementById("filter-scene");
    elements.filterKpi = document.getElementById("filter-kpi");
    elements.heroHighlights = document.getElementById("hero-highlights");
    elements.heroFocus = document.getElementById("hero-focus");
    elements.heroVideo = document.getElementById("hero-video");
    elements.backgroundGrid = document.getElementById("background-grid");
    elements.capabilityGrid = document.getElementById("capability-grid");
    elements.moduleGrid = document.getElementById("module-grid");
    elements.flowGrid = document.getElementById("flow-grid");
    elements.outcomeSummary = document.getElementById("outcome-summary");
    elements.outcomeGrid = document.getElementById("outcome-grid");
    elements.demoVideo = document.getElementById("demo-video");
    elements.footerCopy = document.getElementById("footer-copy");
  }

  function hydrateMeta() {
    const metaDescription = document.querySelector('meta[name="description"]');
    document.title = content.meta.title;
    metaDescription.setAttribute("content", content.meta.description);
    elements.brandTitle.textContent = content.meta.title;
    elements.brandSubtitle.textContent = content.meta.subtitle;
    elements.heroEyebrow.textContent = content.hero.eyebrow;
    elements.heroTitle.textContent = content.hero.title;
    elements.heroSummary.textContent = content.hero.summary;
    elements.heroTags.innerHTML = content.hero.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
    elements.footerCopy.textContent = `公开展示版 · 静态部署 · 更新于 ${content.meta.lastUpdated}`;
  }

  function renderStaticSections() {
    elements.backgroundGrid.innerHTML = content.background
      .map(
        (item) => `
          <article class="info-card panel">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");

    elements.capabilityGrid.innerHTML = content.capabilities
      .map(
        (item, index) => `
          <article class="capability-card panel">
            <span class="capability-index">0${index + 1}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");

    elements.flowGrid.innerHTML = content.systemFlow
      .map(
        (item, index) => `
          <article class="flow-card panel">
            <span class="flow-step">STEP ${index + 1}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");

    elements.outcomeGrid.innerHTML = content.outcomes
      .map(
        (item) => `
          <article class="outcome-card panel">
            <p class="outcome-title">${item.title}</p>
            <strong>${item.value}</strong>
            <p>${item.text}</p>
          </article>
        `
      )
      .join("");
  }

  function renderFilters() {
    renderFilterGroup(elements.filterDimension, content.filters.dimensions, "dimension");
    renderFilterGroup(elements.filterScene, content.filters.scenes, "scene");
    renderFilterGroup(elements.filterKpi, content.filters.kpis, "kpi");
  }

  function renderFilterGroup(container, options, key) {
    container.innerHTML = options
      .map(
        (item) => `
          <button
            class="chip ${state[key] === item.id ? "is-active" : ""}"
            type="button"
            data-filter="${key}"
            data-value="${item.id}"
          >
            ${item.label}
          </button>
        `
      )
      .join("");
  }

  function bindFilterEvents() {
    document.addEventListener("click", (event) => {
      const chip = event.target.closest("[data-filter]");
      if (!chip) {
        return;
      }

      const key = chip.getAttribute("data-filter");
      const value = chip.getAttribute("data-value");
      if (!Object.prototype.hasOwnProperty.call(state, key)) {
        return;
      }

      state[key] = value;
      renderFilters();
      renderAll();
    });
  }

  function renderAll() {
    const series = buildSeries(state.dimension, state.scene);
    const selectionText = `${labelFor("dimensions", state.dimension)} / ${labelFor("scenes", state.scene)} / ${labelFor("kpis", state.kpi)}`;

    elements.selectionNote.textContent = `当前筛选：${selectionText}`;

    renderHeroHighlights(series);
    renderHeroFocus(series);
    renderModules(series);
    renderOutcomeSummary(series);
    renderVideoShell(elements.heroVideo, true);
    renderVideoShell(elements.demoVideo, false);
  }

  function buildSeries(dimensionId, sceneId) {
    const weeks = content.model.weeks;
    const dimensions = pickProfiles(content.model.dimensionProfiles, dimensionId);
    const scenes = pickProfiles(content.model.sceneProfiles, sceneId);

    const series = weeks.map((week, index) => {
      let amount = 0;
      let count = 0;
      let fee = 0;
      let active = 0;

      dimensions.forEach((dimension) => {
        scenes.forEach((scene) => {
          const seasonal = content.model.seasonal[index];
          const pulse = content.model.pulse[index];
          const sceneWave = scene.wave[index % scene.wave.length];

          const pointAmount =
            dimension.amountBase * scene.amountFactor +
            index * (dimension.amountStep + scene.amountTrend) +
            seasonal * dimension.volatility +
            pulse * scene.momentum +
            sceneWave;

          const pointCount =
            dimension.countBase * scene.countFactor +
            index * (dimension.countStep + scene.countTrend) +
            seasonal * (dimension.volatility * 1.4) +
            pulse * 1.3 +
            sceneWave * 4.5;

          const pointActive =
            dimension.activeBase * scene.activeFactor +
            index * (dimension.activeStep + scene.activeTrend) +
            seasonal * 3.2 +
            pulse * 2.4 +
            sceneWave * 7.5;

          amount += pointAmount;
          count += pointCount;
          active += pointActive;
          fee += pointAmount * (dimension.feeRate + scene.feeDelta);
        });
      });

      return {
        week,
        amount: round(amount),
        count: round(count),
        fee: round(fee),
        active: Math.round(active)
      };
    });

    const growth = series.map((point, index) => {
      if (index === 0) {
        return 0;
      }
      const previous = series[index - 1].amount;
      return round(((point.amount - previous) / previous) * 100, 1);
    });

    const amountBaseline = series.map((point, index) => round(point.amount * (0.92 + index * 0.002)));
    const countBaseline = series.map((point, index) => round(point.count * (0.95 + index * 0.001)));
    const feeBaseline = series.map((point, index) => round(point.fee * (0.94 + index * 0.0015)));
    const activeBaseline = series.map((point, index) => Math.round(point.active * (0.93 + index * 0.001)));

    const current = series[series.length - 1];
    const previous = series[series.length - 2];
    const currentGrowth = growth[growth.length - 1];
    const avgTicket = round((current.amount * 1000) / current.count, 1);
    const feeEfficiency = round((current.fee / current.amount) * 100, 1);

    return {
      weeks,
      amount: series.map((point) => point.amount),
      count: series.map((point) => point.count),
      fee: series.map((point) => point.fee),
      active: series.map((point) => point.active),
      growth,
      amountBaseline,
      countBaseline,
      feeBaseline,
      activeBaseline,
      current,
      previous,
      currentGrowth,
      avgTicket,
      feeEfficiency,
      summary: {
        deltaAmount: round(current.amount - previous.amount),
        deltaCount: round(current.count - previous.count),
        deltaFee: round(current.fee - previous.fee),
        deltaActive: current.active - previous.active
      }
    };
  }

  function renderHeroHighlights(series) {
    const focusMetric = metricMap[state.kpi];
    const cards = [
      {
        label: "观察窗口",
        value: `${content.model.weeks.length} 周`,
        note: "固定周序列"
      },
      {
        label: "当前切片",
        value: `${labelFor("dimensions", state.dimension)} / ${labelFor("scenes", state.scene)}`,
        note: "随筛选联动"
      },
      {
        label: focusMetric.label,
        value: formatMetric(state.kpi, latestValue(series, state.kpi)),
        note: `最新一周 ${formatGrowth(series.currentGrowth)}`
      },
      {
        label: "活跃主体",
        value: formatMetric("active", series.current.active),
        note: `较前一周 ${signedNumber(series.summary.deltaActive)}`
      }
    ];

    elements.heroHighlights.innerHTML = cards
      .map(
        (card) => `
          <article class="highlight-card panel">
            <p>${card.label}</p>
            <strong>${card.value}</strong>
            <span>${card.note}</span>
          </article>
        `
      )
      .join("");
  }

  function renderHeroFocus(series) {
    const kpi = state.kpi;
    const label = labelFor("kpis", kpi);
    const value = latestValue(series, kpi);
    const delta = kpi === "growth" ? series.currentGrowth : latestDelta(series, kpi);

    elements.heroFocus.innerHTML = `
      <div class="focus-metric">
        <div>
          <p class="panel-label">焦点指标</p>
          <h3>${label}</h3>
        </div>
        <strong style="color:${metricMap[kpi].accent}">${formatMetric(kpi, value)}</strong>
      </div>
      <p class="focus-description">
        当前切片为 <strong>${labelFor("dimensions", state.dimension)}</strong> / <strong>${labelFor("scenes", state.scene)}</strong>，
        最近一周的变化为 <strong>${kpi === "growth" ? formatGrowth(delta) : signedMetric(kpi, delta)}</strong>。
      </p>
      <div class="chart-shell compact">
        ${renderLineChart(series.weeks, series[kpi], {
          id: "hero-focus-chart",
          color: metricMap[kpi].accent,
          fill: true
        })}
      </div>
      <div class="focus-stats">
        <span>均值 ${formatMetric(kpi, average(series[kpi]))}</span>
        <span>峰值 ${formatMetric(kpi, max(series[kpi]))}</span>
      </div>
    `;
  }

  function renderModules(series) {
    elements.moduleGrid.innerHTML = content.modules
      .map((module, index) => {
        return `
          <article class="module-card panel">
            <div class="module-head">
              <div>
                <p class="module-index">MODULE 0${index + 1}</p>
                <h3>${module.title}</h3>
              </div>
              <span class="module-pill">${module.subtitle}</span>
            </div>
            <p class="module-description">${module.description}</p>
            ${renderModuleBody(module.id, series)}
          </article>
        `;
      })
      .join("");
  }

  function renderModuleBody(moduleId, series) {
    if (moduleId === "overview") {
      return renderOverviewModule(series);
    }

    if (moduleId === "amount") {
      return `
        <div class="chart-shell">
          ${renderLineChart(series.weeks, series.amount, {
            id: "module-amount",
            color: metricMap.amount.accent,
            fill: true,
            baseline: series.amountBaseline
          })}
        </div>
        <div class="module-meta">
          <span>最新值 ${formatMetric("amount", series.current.amount)}</span>
          <span>对照线 ${formatMetric("amount", series.amountBaseline[series.amountBaseline.length - 1])}</span>
        </div>
      `;
    }

    if (moduleId === "count") {
      return `
        <div class="chart-shell">
          ${renderBarChart(series.weeks, series.count, {
            id: "module-count",
            color: metricMap.count.accent
          })}
        </div>
        <div class="module-meta">
          <span>最新值 ${formatMetric("count", series.current.count)}</span>
          <span>较前一周 ${signedMetric("count", series.summary.deltaCount)}</span>
        </div>
      `;
    }

    if (moduleId === "fee") {
      return `
        <div class="chart-shell">
          ${renderLineChart(series.weeks, series.fee, {
            id: "module-fee",
            color: metricMap.fee.accent,
            fill: true,
            baseline: series.feeBaseline
          })}
        </div>
        <div class="module-meta">
          <span>最新值 ${formatMetric("fee", series.current.fee)}</span>
          <span>费效比 ${series.feeEfficiency}%</span>
        </div>
      `;
    }

    if (moduleId === "growth") {
      return `
        <div class="chart-shell">
          ${renderGrowthChart(series.weeks, series.growth, {
            id: "module-growth",
            positive: "var(--accent-lime)",
            negative: "var(--accent-coral)"
          })}
        </div>
        <div class="module-meta">
          <span>最新值 ${formatGrowth(series.currentGrowth)}</span>
          <span>波动均值 ${formatGrowth(average(series.growth.slice(1)))}</span>
        </div>
      `;
    }

    return `
      <div class="chart-shell">
        ${renderLineChart(series.weeks, series.active, {
          id: "module-active",
          color: metricMap.active.accent,
          fill: false,
          baseline: series.activeBaseline
        })}
      </div>
      <div class="module-meta">
        <span>最新值 ${formatMetric("active", series.current.active)}</span>
        <span>较前一周 ${signedMetric("active", series.summary.deltaActive)}</span>
      </div>
    `;
  }

  function renderOverviewModule(series) {
    const focusLabel = labelFor("kpis", state.kpi);
    const overviewStats = [
      {
        label: "当前焦点",
        value: focusLabel,
        note: `${formatMetric(state.kpi, latestValue(series, state.kpi))}`
      },
      {
        label: "平均客单效率",
        value: `${series.avgTicket}`,
        note: "单位 / 千笔"
      },
      {
        label: "费效比",
        value: `${series.feeEfficiency}%`,
        note: "手续费 / 规模"
      },
      {
        label: "活跃覆盖",
        value: `${Math.round((series.current.active / max(series.active)) * 100)}%`,
        note: "对比 12 周峰值"
      }
    ];

    return `
      <div class="overview-layout">
        <div class="overview-stats">
          ${overviewStats
            .map(
              (item) => `
                <div class="overview-stat">
                  <p>${item.label}</p>
                  <strong>${item.value}</strong>
                  <span>${item.note}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="overview-trend">
          ${renderLineChart(series.weeks, series[state.kpi], {
            id: "module-overview",
            color: metricMap[state.kpi].accent,
            fill: true
          })}
        </div>
      </div>
    `;
  }

  function renderOutcomeSummary(series) {
    const kpi = state.kpi;
    const summaryValue = formatMetric(kpi, latestValue(series, kpi));
    const summaryCopy = `
      <div class="summary-copy">
        <p class="panel-label">当前切片摘要</p>
        <h3>${labelFor("dimensions", state.dimension)} / ${labelFor("scenes", state.scene)}</h3>
        <p>当前焦点为 ${labelFor("kpis", state.kpi)}，最近一周读数 ${summaryValue}，环比 ${formatGrowth(series.currentGrowth)}。</p>
      </div>
      <div class="summary-tags">
        <span class="tag">公开展示友好</span>
        <span class="tag">内容集中配置</span>
        <span class="tag">支持后续补视频</span>
      </div>
    `;

    elements.outcomeSummary.innerHTML = summaryCopy;
  }

  function renderVideoShell(container, compact) {
    const video = content.meta.demoVideo;
    const detected = detectVideo(video.url);

    if (!video.url) {
      container.innerHTML = `
        <div class="video-placeholder ${compact ? "is-compact" : ""}">
          <div class="video-frame">
            <div class="video-copy">
              <span class="panel-label">Demo Placeholder</span>
              <h3>${compact ? "这里预留演示画面" : "这里预留一段 16:9 演示视频"}</h3>
              <p>${video.caption}</p>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (detected.type === "embed") {
      container.innerHTML = `
        <div class="video-embed ${compact ? "is-compact" : ""}">
          <iframe
            src="${detected.src}"
            title="项目演示"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
      return;
    }

    if (detected.type === "file") {
      container.innerHTML = `
        <div class="video-embed ${compact ? "is-compact" : ""}">
          <video controls playsinline preload="metadata" src="${detected.src}"></video>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <a class="video-link ${compact ? "is-compact" : ""}" href="${video.url}" target="_blank" rel="noreferrer">
        <div class="video-frame">
          <div class="video-copy">
            <span class="panel-label">External Demo</span>
            <h3>打开公开演示</h3>
            <p>当前链接不适合直接嵌入，页面会保留一个可跳转的演示入口。</p>
          </div>
          <span class="video-arrow">Open</span>
        </div>
      </a>
    `;
  }

  function renderLineChart(labels, values, options) {
    const width = 540;
    const height = 200;
    const padding = 22;
    const points = toPoints(values, width, height, padding);
    const linePath = pointsToPath(points);
    const areaPath = pointsToArea(points, height, padding);
    const baselinePath = options.baseline ? pointsToPath(toPoints(options.baseline, width, height, padding)) : "";
    const ticks = buildTicks(labels, width, height);
    const gradientId = `${options.id}-gradient`;

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="图表">
        <defs>
          <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="${cssVarToRgba(options.color, 0.35)}"></stop>
            <stop offset="100%" stop-color="${cssVarToRgba(options.color, 0)}"></stop>
          </linearGradient>
        </defs>
        ${ticks}
        ${options.fill ? `<path d="${areaPath}" fill="url(#${gradientId})"></path>` : ""}
        ${baselinePath ? `<path d="${baselinePath}" class="chart-baseline"></path>` : ""}
        <path d="${linePath}" fill="none" stroke="${options.color}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path>
        ${points
          .map(
            (point, index) => `
              <circle
                cx="${point.x}"
                cy="${point.y}"
                r="${index === points.length - 1 ? 4.5 : 2.2}"
                fill="${options.color}"
              ></circle>
            `
          )
          .join("")}
      </svg>
    `;
  }

  function renderBarChart(labels, values, options) {
    const width = 540;
    const height = 200;
    const padding = 22;
    const maxValue = Math.max(...values);
    const barWidth = (width - padding * 2) / values.length - 8;

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="图表">
        ${buildTicks(labels, width, height)}
        ${values
          .map((value, index) => {
            const x = padding + index * ((width - padding * 2) / values.length) + 4;
            const h = ((value / maxValue) * (height - padding * 2 - 24));
            const y = height - padding - h;
            return `
              <rect
                x="${x}"
                y="${y}"
                width="${barWidth}"
                height="${h}"
                rx="10"
                fill="${cssVarToRgba(options.color, index === values.length - 1 ? 0.95 : 0.5)}"
              ></rect>
            `;
          })
          .join("")}
      </svg>
    `;
  }

  function renderGrowthChart(labels, values, options) {
    const width = 540;
    const height = 200;
    const padding = 22;
    const center = height / 2;
    const maxValue = Math.max(...values.map((value) => Math.abs(value)), 1);
    const barWidth = (width - padding * 2) / values.length - 8;

    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="图表">
        ${buildTicks(labels, width, height)}
        <line x1="${padding}" x2="${width - padding}" y1="${center}" y2="${center}" class="chart-axis"></line>
        ${values
          .map((value, index) => {
            const x = padding + index * ((width - padding * 2) / values.length) + 4;
            const h = (Math.abs(value) / maxValue) * (height / 2 - padding - 8);
            const y = value >= 0 ? center - h : center;
            return `
              <rect
                x="${x}"
                y="${y}"
                width="${barWidth}"
                height="${h}"
                rx="8"
                fill="${value >= 0 ? options.positive : options.negative}"
                opacity="${index === values.length - 1 ? 1 : 0.72}"
              ></rect>
            `;
          })
          .join("")}
      </svg>
    `;
  }

  function buildTicks(labels, width, height) {
    const indexes = [0, Math.floor((labels.length - 1) / 2), labels.length - 1];
    return indexes
      .map((index) => {
        const x = 22 + (index * (width - 44)) / (labels.length - 1);
        return `
          <g>
            <line x1="${x}" x2="${x}" y1="18" y2="${height - 20}" class="chart-grid"></line>
            <text x="${x}" y="${height - 2}" text-anchor="middle" class="chart-label">${labels[index]}</text>
          </g>
        `;
      })
      .join("");
  }

  function toPoints(values, width, height, padding) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;

    return values.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1);
      const y = height - padding - ((value - min) / span) * (height - padding * 2 - 16) - 8;
      return { x: round(x, 2), y: round(y, 2) };
    });
  }

  function pointsToPath(points) {
    return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  }

  function pointsToArea(points, height, padding) {
    const line = pointsToPath(points);
    const first = points[0];
    const last = points[points.length - 1];
    return `${line} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`;
  }

  function detectVideo(url) {
    if (!url) {
      return { type: "placeholder" };
    }

    if (/\.(mp4|webm|ogg)$/i.test(url)) {
      return { type: "file", src: url };
    }

    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i);
    if (youtubeMatch) {
      return {
        type: "embed",
        src: `https://www.youtube.com/embed/${youtubeMatch[1]}`
      };
    }

    return { type: "link", src: url };
  }

  function pickProfiles(profiles, selectedId) {
    if (selectedId === "all") {
      return profiles;
    }
    return profiles.filter((profile) => profile.id === selectedId);
  }

  function labelFor(groupName, id) {
    const item = content.filters[groupName].find((entry) => entry.id === id);
    return item ? item.label : id;
  }

  function latestValue(series, key) {
    if (key === "growth") {
      return series.currentGrowth;
    }
    return series[key][series[key].length - 1];
  }

  function latestDelta(series, key) {
    if (key === "growth") {
      return series.currentGrowth;
    }
    return series.summary[`delta${capitalize(key)}`];
  }

  function formatMetric(key, value) {
    if (key === "amount" || key === "fee") {
      return `${round(value, 1)}M`;
    }
    if (key === "count") {
      return `${Math.round(value)}k`;
    }
    if (key === "growth") {
      return formatGrowth(value);
    }
    return `${Math.round(value)}`;
  }

  function formatGrowth(value) {
    return `${value >= 0 ? "+" : ""}${round(value, 1)}%`;
  }

  function signedMetric(key, value) {
    if (key === "growth") {
      return formatGrowth(value);
    }
    return `${value >= 0 ? "+" : "-"}${formatMetric(key, Math.abs(value))}`;
  }

  function signedNumber(value) {
    return `${value >= 0 ? "+" : ""}${value}`;
  }

  function average(values) {
    return round(values.reduce((sum, value) => sum + value, 0) / values.length, 1);
  }

  function max(values) {
    return Math.max(...values);
  }

  function round(value, precision) {
    const digits = typeof precision === "number" ? precision : 2;
    return Number(value.toFixed(digits));
  }

  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function cssVarToRgba(variable, alpha) {
    const rgbMap = {
      "var(--accent-cyan)": `rgba(80, 222, 255, ${alpha})`,
      "var(--accent-amber)": `rgba(255, 189, 89, ${alpha})`,
      "var(--accent-lime)": `rgba(170, 255, 129, ${alpha})`,
      "var(--accent-coral)": `rgba(255, 124, 98, ${alpha})`,
      "var(--accent-violet)": `rgba(172, 140, 255, ${alpha})`
    };

    return rgbMap[variable] || `rgba(255, 255, 255, ${alpha})`;
  }
})();
